import { Router, Request, Response } from 'express';
import { supabaseAdmin } from '../services/supabaseClients';
import { requireAuth } from '../middleware/authMiddleware';

const router = Router();

router.use(requireAuth);

router.get('/stats', async (req: Request, res: Response) => {
  const userId = req.auth.userId;

  try {
    // Example stats: Count of journals/entries
    // You might need to adjust table names based on your schema
    const { count: journalCount, error: journalError } = await supabaseAdmin
      .from('journals')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId); // Ensure this column exists and is text/uuid compatible

    if (journalError) throw journalError;

    res.json({
      journalCount: journalCount || 0,
      // Add other stats here
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
