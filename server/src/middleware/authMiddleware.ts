import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { ClerkExpressRequireAuth, clerkClient } from '@clerk/clerk-sdk-node';
import { supabaseAdmin } from '../services/supabaseClients';

// Extend Express Request to include Clerk auth
declare global {
  namespace Express {
    interface Request {
      auth: {
        userId: string;
        sessionId: string;
        getToken: () => Promise<string>;
      };
      user?: any; // For backward compatibility or if we fetch full user
    }
  }
}

// Clerk middleware for Express
export const requireAuth = ClerkExpressRequireAuth({
  // Optional: Add configuration here if needed
}) as unknown as import('express').RequestHandler;

// Middleware to sync Clerk user to Supabase (Lazy Sync)
export const syncUserToSupabase = async (req: Request, res: Response, next: NextFunction) => {
  console.log('syncUserToSupabase called');
  if (!req.auth || !req.auth.userId) {
    console.log('No auth or userId found in request');
    return next();
  }

  const userId = req.auth.userId;
  console.log(`Checking Supabase for user: ${userId}`);

  try {
    // 1. Check if user exists by clerk_id
    const { data: existingUserByClerkId, error: fetchError } = await supabaseAdmin
      .from('profiles')
      .select('id, clerk_id')
      .eq('clerk_id', userId)
      .maybeSingle();

    if (fetchError) {
        console.error('Error fetching user from Supabase:', fetchError);
    }

    if (existingUserByClerkId) {
        console.log(`User ${userId} found in Supabase (by clerk_id).`);
        return next();
    }

    // 2. If not found by clerk_id, fetch details from Clerk
    console.log(`User ${userId} not found by clerk_id. Fetching details from Clerk...`);
    let user;
    try {
        user = await clerkClient.users.getUser(userId);
    } catch (clerkError) {
        console.error('Error fetching user from Clerk:', clerkError);
        return next();
    }

    const email = user.emailAddresses[0]?.emailAddress;
    const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim();

    // 3. Check if user exists by email (to link existing accounts)
    if (email) {
        const { data: existingUserByEmail } = await supabaseAdmin
            .from('profiles')
            .select('id')
            .eq('email', email)
            .maybeSingle();

        if (existingUserByEmail) {
            console.log(`User found by email ${email}. Updating clerk_id...`);
            await supabaseAdmin
                .from('profiles')
                .update({ clerk_id: userId })
                .eq('id', existingUserByEmail.id);
            return next();
        }
    }

    // 4. Create new user
    console.log(`Creating new user for ${userId} (${email})...`);
    // Note: We let Supabase generate the UUID for 'id'
    const { error: insertError } = await supabaseAdmin.from('profiles').insert({
        id: crypto.randomUUID(),
        clerk_id: userId,
        role: 'user',
        email: email,
        full_name: fullName,
    });
    
    if (insertError) {
        console.error('Error inserting user into Supabase:', insertError);
    } else {
        console.log(`Successfully synced user ${userId} to Supabase`);
    }

    next();
  } catch (error) {
    console.error('Error syncing user to Supabase:', error);
    next(); // Don't block request on sync error
  }
};
