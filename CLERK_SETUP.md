# Clerk Setup Guide

To make the authentication work, you need to set up Clerk.

## 1. Create Clerk Account
1.  Go to [Clerk.com](https://clerk.com/).
2.  Sign up and create a new application.
3.  Choose **Google**, **GitHub**, **Facebook**, and **Email** as authentication methods.

## 2. Get API Keys
1.  In your Clerk Dashboard, go to **API Keys**.
2.  Copy the **Publishable Key** and **Secret Key**.

## 3. Configure Client (`client/.env.local`)
Create a `.env.local` file in the `client` folder:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/register
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

## 4. Configure Server (`server/.env`)
Add the Secret Key to your `server/.env` file:
```env
CLERK_SECRET_KEY=sk_test_...
```

## 5. Restart Servers
Restart both `client` and `server` terminals to load the new keys.
