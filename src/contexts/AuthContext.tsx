import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
  isEditor: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Fetch user role
          setTimeout(async () => {
            const { data: profile } = await supabase
              .from('profiles')
              .select('role')
              .eq('id', session.user.id)
              .single();
            
            // Auto-promote admin user if it's the default admin email
            if (session.user.email === 'admin@cristal.com' && (!profile || profile.role !== 'admin')) {
              await supabase.rpc('promote_user_to_admin', { user_email: 'admin@cristal.com' });
              setUserRole('admin');
            } else {
              setUserRole(profile?.role || null);
            }
          }, 0);
        } else {
          setUserRole(null);
        }
        
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        // Fetch user role
        setTimeout(async () => {
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();
          
          setUserRole(profile?.role || null);
        }, 0);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    // Vérification pour l'admin spécial
    if (email === 'Admin' && password === 'Cristal1234') {
      // Créer une session factice pour l'admin
      const adminUser = {
        id: 'admin-special-id',
        email: 'admin@cristal.com',
        role: 'admin'
      } as any;
      
      setUser(adminUser);
      setSession({ user: adminUser } as any);
      setUserRole('admin');
      
      return { error: null };
    }
    
    // Authentification normale avec Supabase
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signUp = async (email: string, password: string, fullName?: string) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName || email
        }
      }
    });
    return { error };
  };

  const signOut = async () => {
    // Si c'est l'admin spécial, on reset les états localement
    if (user?.id === 'admin-special-id') {
      setUser(null);
      setSession(null);
      setUserRole(null);
      return;
    }
    
    // Sinon déconnexion Supabase normale
    await supabase.auth.signOut();
  };

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    isAdmin: userRole === 'admin',
    isEditor: userRole === 'editor' || userRole === 'admin',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};