import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signInWithGoogle } = useAuth();
  const [, setLocation] = useLocation();

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // use-auth effect will catch this and sync to backend
      setLocation("/my-style");
    } catch (err: any) {
      setError(err.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (err) {
      setError("Google sign in failed");
    }
  };

  return (
    <div className="min-h-screen bg-secondary/30 flex items-center justify-center px-4 pt-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-background rounded-[2rem] shadow-xl border border-border/50 p-8 sm:p-10"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-bold mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to access your style profile.</p>
        </div>

        {error && (
          <div className="bg-destructive/10 text-destructive text-sm p-4 rounded-xl mb-6 border border-destructive/20">
            {error}
          </div>
        )}

        <form onSubmit={handleEmailSignIn} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium">Email Address</label>
            <Input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 rounded-xl bg-card"
              placeholder="you@example.com"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Password</label>
            <Input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 rounded-xl bg-card"
              placeholder="••••••••"
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full h-12 rounded-xl text-base fashion-shadow">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign In"}
          </Button>
        </form>

        <div className="mt-8 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-background px-4 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <Button 
          type="button" 
          variant="outline" 
          onClick={handleGoogleSignIn}
          className="w-full mt-8 h-12 rounded-xl text-base bg-card hover:bg-secondary"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Google
        </Button>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link href="/sign-up" className="text-primary font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
