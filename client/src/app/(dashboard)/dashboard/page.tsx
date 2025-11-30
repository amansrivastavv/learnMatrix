import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    redirect('/login');
  }

  // Fetch dashboard stats
  let stats = { journalCount: 0 };
  const { getToken } = await auth();
  const token = await getToken();
  
  try {
    // 1. Sync User (Lazy Sync)
    await fetch('http://localhost:5000/api/users/me', {
      headers: { Authorization: `Bearer ${token}` },
    });

    // 2. Fetch Stats
    const res = await fetch('http://localhost:5000/api/dashboard/stats', {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store' // Ensure fresh data
    });
    
    if (res.ok) {
      stats = await res.json();
    }
  } catch (err) {
    console.error('Failed to fetch dashboard data:', err);
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user.firstName || 'User'}! 👋</h1>
          <p className="text-muted-foreground">Here's what's happening with your learning today.</p>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Total Journals</h3>
          </div>
          <div className="text-2xl font-bold">{stats.journalCount}</div>
          <p className="text-xs text-muted-foreground">+0 from last month</p>
        </div>
        {/* Add more cards here as we implement features */}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4 rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6 flex flex-col space-y-3">
            <h3 className="font-semibold leading-none tracking-tight">Recent Activity</h3>
            <p className="text-sm text-muted-foreground">
              You have {stats.journalCount} journal entries recorded.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
