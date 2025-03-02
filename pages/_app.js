import '../styles/globals.css';
import { supabase } from '../lib/supabaseClient';
import { useEffect, useState } from 'react';
import { createContext } from 'react';

// Create Auth context for sharing user info across components
export const AuthContext = createContext();

function MyApp({ Component, pageProps }) {
  const [session, setSession] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const initializeAuth = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      
      if (data.session?.user) {
        // Get user metadata
        const { data: profileData } = await supabase
          .from('profiles')
          .select('first_name, last_name')
          .eq('id', data.session.user.id)
          .single();
          
        setUserProfile({
          ...profileData,
          ...data.session.user.user_metadata
        });
      }
      
      setLoading(false);
    };

    initializeAuth();

    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        
        if (session?.user) {
          // Get user metadata on auth change
          const { data: profileData } = await supabase
            .from('profiles')
            .select('first_name, last_name')
            .eq('id', session.user.id)
            .single();
            
          setUserProfile({
            ...profileData,
            ...session.user.user_metadata
          });
        } else {
          setUserProfile(null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Pass auth context to all pages
  return (
    <AuthContext.Provider value={{ session, userProfile, loading }}>
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
}

export default MyApp;