# Social Login Setup Guide

To make the Google, GitHub, and Facebook buttons work, you need to configure Supabase.

## 1. Google Login Setup
1.  Go to the [Google Cloud Console](https://console.cloud.google.com/).
2.  Create a new project.
3.  Go to **APIs & Services > Credentials**.
4.  Click **Create Credentials > OAuth client ID**.
5.  Select **Web application**.
6.  Add the following **Authorized redirect URI**:
    - `https://<your-project-ref>.supabase.co/auth/v1/callback`
    - *(Find this URL in your Supabase Dashboard > Authentication > Providers > Google)*
7.  Copy the **Client ID** and **Client Secret**.
8.  Go to your **Supabase Dashboard > Authentication > Providers**.
9.  Enable **Google** and paste the Client ID and Secret.

## 2. GitHub Login Setup
1.  Go to [GitHub Developer Settings](https://github.com/settings/developers).
2.  Click **New OAuth App**.
3.  Fill in the details:
    - **Homepage URL**: `http://localhost:3000`
    - **Authorization callback URL**: `https://<your-project-ref>.supabase.co/auth/v1/callback`
    - *(Find this URL in your Supabase Dashboard > Authentication > Providers > GitHub)*
4.  Copy the **Client ID** and generate a **Client Secret**.
5.  Go to your **Supabase Dashboard > Authentication > Providers**.
6.  Enable **GitHub** and paste the Client ID and Secret.

## 3. Facebook Login Setup
1.  Go to [Meta for Developers](https://developers.facebook.com/).
2.  Create a new App (Select "Authenticate and request data from users with Facebook Login").
3.  Go to **Facebook Login > Settings**.
4.  Add the following **Valid OAuth Redirect URI**:
    - `https://<your-project-ref>.supabase.co/auth/v1/callback`
5.  Go to **Settings > Basic**.
6.  Copy the **App ID** and **App Secret**.
7.  Go to your **Supabase Dashboard > Authentication > Providers**.
8.  Enable **Facebook** and paste the App ID and Secret.

## 4. Testing
Once configured, restart your app and click the buttons on the login page!
