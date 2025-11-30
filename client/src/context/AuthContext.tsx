"use client";

import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useAuth as useClerkAuth, useUser, useSignIn, useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: any | null;
  token: string | null;
  getToken: () => Promise<string | null>;
  login: (email: string, pass: string) => Promise<void>;
  register: (name: string, email: string, pass: string) => Promise<void>;
  loginWithProvider: (provider: 'oauth_google' | 'oauth_github' | 'oauth_facebook') => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { isLoaded, userId, sessionId, getToken, signOut } = useClerkAuth();
  const { user: clerkUser } = useUser();
  const [user, setUser] = React.useState<any>(null);
  const { signIn, isLoaded: isSignInLoaded } = useSignIn();
  const { signUp, isLoaded: isSignUpLoaded } = useSignUp();
  const router = useRouter();

  React.useEffect(() => {
    if (clerkUser) {
      // Fetch role from backend API (bypasses RLS)
      getToken().then(async (token) => {
        try {
          const res = await fetch('http://localhost:5000/api/users/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          
          if (res.ok) {
            const data = await res.json();
            setUser({ ...clerkUser, role: data?.role || 'user' });
          } else {
            console.error('Failed to fetch user role:', await res.text());
            setUser({ ...clerkUser, role: 'user' });
          }
        } catch (error) {
          console.error('Error fetching user role:', error);
          setUser({ ...clerkUser, role: 'user' });
        }
      });
    } else {
      setUser(null);
    }
  }, [clerkUser]);

  const login = async (email: string, pass: string) => {
    if (!isSignInLoaded || !signIn) return;
    try {
      const result = await signIn.create({
        identifier: email,
        password: pass,
      });

      if (result.status === "complete") {
        if (setActive) await setActive({ session: result.createdSessionId });
        router.push('/dashboard');
      } else {
        console.error("Login incomplete", result);
      }
    } catch (err: any) {
      console.error("Login error", err.errors[0]?.longMessage);
      throw new Error(err.errors[0]?.longMessage);
    }
  };

  const register = async (name: string, email: string, pass: string) => {
    if (!isSignUpLoaded || !signUp) return;
    try {
      const result = await signUp.create({
        emailAddress: email,
        password: pass,
        firstName: name.split(' ')[0],
        lastName: name.split(' ').slice(1).join(' '),
      });

      if (result.status === "complete") {
        if (setActive) await setActive({ session: result.createdSessionId });
        router.push('/dashboard');
      } else {
        console.error("Registration incomplete", result);
      }
    } catch (err: any) {
      console.error("Registration error", err.errors[0]?.longMessage);
      throw new Error(err.errors[0]?.longMessage);
    }
  };

  const loginWithProvider = async (provider: 'oauth_google' | 'oauth_github' | 'oauth_facebook') => {
    if (!isSignInLoaded || !signIn) return;
    
    // If already signed in, redirect to dashboard
    if (clerkUser) {
      router.push('/dashboard');
      return;
    }

    try {
      await signIn.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: '/sso-callback',
        redirectUrlComplete: '/dashboard'
      });
    } catch (err: any) {
      // If error says already signed in, redirect
      if (err?.errors?.[0]?.code === 'session_exists') {
        router.push('/dashboard');
        return;
      }
      console.error("Social login error", err);
      throw err;
    }
  };

  const logout = async () => {
    await signOut();
    router.push('/login');
  };

  const { setActive } = useSignIn();

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        token: null, 
        getToken,
        login, 
        register, 
        loginWithProvider, 
        logout, 
        isLoading: !isLoaded 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
