# Admin Setup Guide

To log in as an Admin, you need to do two things:

## 1. Add Supabase Keys to Client
The client needs these keys to check if you are an admin.

1.  Open `d:\Aman\LearnMatrix\learn-matrix\client\.env.local`.
2.  Add these lines (use the SAME keys you added to `server/.env`):

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

3.  **Restart the Client** (`npm run dev` in client terminal).

## 2. Make Yourself an Admin
There is no default admin account. You must promote yourself.

1.  **Login/Sign Up** to your app as a normal user.
2.  Go to your [Supabase Dashboard](https://supabase.com/dashboard).
3.  Go to **Table Editor** -> **profiles** table.
4.  Find your user row (look for your email).
5.  Change the `role` column from `user` to `admin`.
6.  Click **Save**.

## 3. Access Admin Panel
1.  Refresh your app.
2.  Go to `/admin`.
3.  You should now have access!
