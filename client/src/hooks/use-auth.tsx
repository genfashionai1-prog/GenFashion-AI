import { createContext, useContext, useEffect, useState } from "react";
import { 
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { useLocation } from "wouter";
import { api } from "@shared/routes";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signInWithGoogle: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [, setLocation] = useLocation();

  const syncUserToBackend = async (firebaseUser: User) => {
    try {
      await fetch(api.users.createOrUpdate.path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: firebaseUser.uid,
          name: firebaseUser.displayName || "User",
          email: firebaseUser.email || "",
          password: ""
        })
      });
    } catch (e) {
      console.error("Failed to sync user to backend", e);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        await syncUserToBackend(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await syncUserToBackend(result.user);
      setLocation("/my-style");
    } catch (error) {
      console.error("Google Sign In Error", error);
      throw error;
    }
  };

  const logout = async () => {
    await signOut(auth);
    setLocation("/");
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
