import { create } from 'zustand';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { auth } from '../config/firebase';

interface AuthStore {
  user: User | null;
  loading: boolean;
  error: string | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: true,
  error: null,
  signUp: async (email, password) => {
    try {
      set({ error: null });
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },
  signIn: async (email, password) => {
    try {
      set({ error: null });
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },
  signOut: async () => {
    try {
      await firebaseSignOut(auth);
      set({ user: null, error: null });
    } catch (error) {
      set({ error: (error as Error).message });
    }
  }
}));

// Set up auth state listener
onAuthStateChanged(auth, (user) => {
  useAuthStore.setState({ user, loading: false });
});