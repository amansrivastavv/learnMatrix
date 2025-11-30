'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Github, Loader2, Zap, Facebook } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login, loginWithProvider } = useAuth();
  
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    const toastId = toast.loading('Signing in...');
    try {
      await login(email, password);
      toast.dismiss(toastId);
      toast.success('Logged in successfully!');
      // Redirect handled in AuthContext
    } catch (error: any) {
      toast.dismiss(toastId);
      toast.error(error.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  }

  const handleSocialLogin = async (provider: 'oauth_google' | 'oauth_github' | 'oauth_facebook') => {
    setIsLoading(true);
    try {
      await loginWithProvider(provider);
    } catch (error: any) {
      toast.error(error.message || 'Social login failed');
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md"
    >
      <div className="bg-card/50 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl p-8 space-y-8">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/25">
              <Zap className="h-6 w-6" />
            </div>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
          <p className="text-muted-foreground">
            Enter your credentials to access your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-background/50 border-white/10 focus:border-primary/50 transition-colors h-11"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link 
                href="/forgot-password" 
                className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              disabled={isLoading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-background/50 border-white/10 focus:border-primary/50 transition-colors h-11"
            />
          </div>

          <Button className="w-full h-11 text-base font-medium shadow-lg shadow-primary/20 cursor-pointer" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign In
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background/50 px-2 text-muted-foreground backdrop-blur-sm">
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Button 
            variant="outline" 
            type="button" 
            disabled={isLoading} 
            className="h-11 bg-background/50 border-white/10 hover:bg-background/80 px-0 cursor-pointer"
            onClick={() => handleSocialLogin('oauth_github')}
          >
            <Github className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            type="button" 
            disabled={isLoading} 
            className="h-11 bg-background/50 border-white/10 hover:bg-background/80 px-0 cursor-pointer"
            onClick={() => handleSocialLogin('oauth_google')}
          >
            <svg className="h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
              <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
            </svg>
          </Button>
          <Button 
            variant="outline" 
            type="button" 
            disabled={isLoading} 
            className="h-11 bg-background/50 border-white/10 hover:bg-background/80 px-0 cursor-pointer"
            onClick={() => handleSocialLogin('oauth_facebook')}
          >
            <Facebook className="h-4 w-4 text-blue-500" />
          </Button>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
