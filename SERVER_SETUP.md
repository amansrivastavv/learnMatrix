# Server Environment Setup Guide

You need to configure the `server/.env` file for the backend to work correctly.

## 1. Supabase Keys
You need to get these from your Supabase Dashboard.

1.  **Log in** to [Supabase](https://supabase.com/dashboard).
2.  Select your project (**LearnMatrix**).
3.  Go to **Settings** (cog icon at the bottom left) -> **API**.
4.  Copy the following values:
    *   **Project URL** -> `SUPABASE_URL`
    *   **anon public** key -> `SUPABASE_ANON_KEY`
    *   **service_role** key (scroll down to find it) -> `SUPABASE_SERVICE_ROLE_KEY`

## 2. Clerk Secret Key
You need to get this from your Clerk Dashboard.

1.  **Log in** to [Clerk](https://dashboard.clerk.com/).
2.  Select your application.
3.  Go to **API Keys** in the sidebar.
4.  Copy the **Secret Key** (starts with `sk_test_...`) -> `CLERK_SECRET_KEY`

## 3. Update `server/.env`
Open `d:\Aman\LearnMatrix\learn-matrix\server\.env` and paste the values:

```env
PORT=5000
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
PASSWORD_RESET_REDIRECT_URL=http://localhost:3000/reset-password
CLERK_SECRET_KEY=sk_test_...
```

## 4. Restart Server
After saving the file, **restart the server terminal** (`npm run dev`) for the changes to take effect.
