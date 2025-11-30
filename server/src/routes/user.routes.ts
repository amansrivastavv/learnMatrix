import { Router, Request, Response } from 'express';
import { supabaseAdmin } from '../services/supabaseClients';
import { requireAuth, syncUserToSupabase } from '../middleware/authMiddleware';

const router = Router();

// Apply middleware to all routes in this router
router.use(requireAuth);
router.use(syncUserToSupabase);

// Get all users (Admin only - using admin client to bypass RLS if needed, or anon if public)
router.get('/', async (req: Request, res: Response) => {
  const { data, error } = await supabaseAdmin
    .from('profiles')
    .select('*');

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  res.json(data);
});

// Get current user profile
router.get('/me', async (req: Request, res: Response) => {
  const userId = req.auth.userId;
  
  const { data, error } = await supabaseAdmin
    .from('profiles')
    .select('*')
    .eq('clerk_id', userId)
    .single();

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  res.json(data);
});

// Update profile
router.put('/profile', async (req: Request, res: Response) => {
  const { id, bio, location, social_links } = req.body;
  const userId = req.auth.userId; // Clerk User ID

  if (!id) {
    res.status(400).json({ error: 'User ID is required' });
    return;
  }

  // Ensure user can only update their own profile
  if (userId !== id) {
     res.status(403).json({ error: 'Unauthorized to update this profile' });
     return;
  }

  // Use admin client because we are verifying auth on the server side via Clerk
  // and we trust the server to make the update.
  const { data, error } = await supabaseAdmin
    .from('profiles')
    .update({ bio, location, social_links })
    .eq('id', id)
    .select();

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  res.json(data);
});

export default router;
