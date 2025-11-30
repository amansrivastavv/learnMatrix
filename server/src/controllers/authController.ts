import { Request, Response } from 'express';
import { supabaseAdmin, supabaseAnon } from '../services/supabaseClients';

/**
 * POST /api/auth/register
 * Body: { email, password, full_name }
 * Creates user (admin.createUser) and upserts profiles table.
 */
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, full_name } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: 'email and password required' });
      return;
    }

    // Create auth user using admin API (service role) so we can set email_confirm true if desired
    const { data: createData, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name }
    });

    if (createError) {
      res.status(400).json({ error: createError.message });
      return;
    }

    const user = createData.user;
    if (!user) {
       res.status(500).json({ error: 'User creation failed' });
       return;
    }

    // Insert profile row in public.profiles
    const { error: upsertError } = await supabaseAdmin
      .from('profiles')
      .upsert({ id: user.id, email: user.email, full_name, role: 'user' }, { returning: 'minimal' } as any);

    if (upsertError) {
      // optionally clean up created auth user in case profile upsert failed
      await supabaseAdmin.auth.admin.deleteUser(user.id).catch(() => {});
      res.status(500).json({ error: upsertError.message });
      return;
    }

    res.status(201).json({ ok: true, user: { id: user.id, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal_error' });
  }
};

/**
 * POST /api/auth/login
 * Body: { email, password }
 * Uses anon client to sign in and returns session (access_token, refresh_token).
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: 'email and password required' });
      return;
    }

    const { data, error } = await supabaseAnon.auth.signInWithPassword({ email, password });
    if (error) {
      res.status(401).json({ error: error.message });
      return;
    }

    // data.session contains access_token, refresh_token, user info
    res.json({ session: data.session });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal_error' });
  }
};

/**
 * POST /api/auth/forgot
 * Body: { email }
 * Sends password reset email with link configured in Supabase Auth settings.
 */
export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({ error: 'email required' });
      return;
    }

    // redirectTo is optional; add if you want users redirected to your frontend reset page
    const redirectTo = process.env.PASSWORD_RESET_REDIRECT_URL || undefined;

    const { data, error } = await supabaseAnon.auth.resetPasswordForEmail(email, { redirectTo });
    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }

    res.json({ ok: true, message: 'Password reset email sent if the account exists' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal_error' });
  }
};

/**
 * POST /api/auth/logout
 * Header: Authorization: Bearer <access_token>
 * Supabase signOut is generally client-side. On server, we can revoke refresh tokens via Admin if needed.
 */
export const logout = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      res.status(400).json({ error: 'No token provided' });
      return;
    }

    // Revoke session by finding user's sessions and deleting via admin API if needed.
    // Simpler approach: client should call supabase.auth.signOut() with anon client.
    // Here we'll call admin API to list sessions and revoke them (service_role required).
    // For now, just return ok and instruct clients to clear local session.
    res.json({ ok: true, message: 'Client should clear local session. To revoke server-side use admin methods.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal_error' });
  }
};
