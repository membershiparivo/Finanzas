import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { User } from '../types';

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const handleUserData = async (userId: string | undefined) => {
    if (!userId) {
      setUser(null);
      return;
    }

    try {
      // First, try to get the user data
      const { data: userData, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (!userData && userId) {
        // If no user data found but we have a userId, get the email from auth
        const { data: { user: authUser } } = await supabase.auth.getUser();
        
        if (authUser?.email) {
          // Create a new user profile
          const { data: newUserData, error: insertError } = await supabase
            .from('users')
            .insert([
              { 
                id: userId,
                email: authUser.email,
                full_name: authUser.email.split('@')[0] // Temporary name
              }
            ])
            .select()
            .single();

          if (insertError) {
            console.error('Error creating user profile:', insertError);
            setUser(null);
            return;
          }

          setUser(newUserData as User);
          return;
        }
      }

      if (error) {
        console.error('Error fetching user data:', error);
        setUser(null);
        return;
      }

      setUser(userData as User);
    } catch (error) {
      console.error('Error in handleUserData:', error);
      setUser(null);
    }
  };

  useEffect(() => {
    // Check active sessions and set the user
    const getSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        await handleUserData(session?.user?.id);
      } catch (error) {
        console.error('Error in getSession:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        try {
          await handleUserData(session?.user?.id);
        } catch (error) {
          console.error('Error in onAuthStateChange:', error);
          setUser(null);
        } finally {
          setLoading(false);
        }
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: 'https://stupendous-zuccutto-f51f47.netlify.app/login',
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      throw error;
    }

    if (data.user) {
      // Insert the new user into our custom users table
      const { error: profileError } = await supabase
        .from('users')
        .insert([
          { 
            id: data.user.id, 
            email: email,
            full_name: fullName 
          }
        ]);

      if (profileError) {
        throw profileError;
      }
    }
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://stupendous-zuccutto-f51f47.netlify.app/login',
    });

    if (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signUp,
        signIn,
        signOut,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};