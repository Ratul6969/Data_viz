import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';
import { supabase } from '../lib/supabaseClient';

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Check if email already exists
      const { data: existingUsers, error: lookupError } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', email);
      
      if (lookupError) throw lookupError;
      
      if (existingUsers && existingUsers.length > 0) {
        setError('An account with this email already exists. Please use another email address.');
        setLoading(false);
        return;
      }
      
      // Sign up the user
      const { error: signupError, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName
          }
        }
      });
      
      if (signupError) throw signupError;
      
      // Create profile entry
      if (data?.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            { 
              id: data.user.id,
              email: email,
              first_name: firstName,
              last_name: lastName,
              created_at: new Date()
            }
          ]);
          
        if (profileError) throw profileError;
      }
      
      // Successful signup, redirect to home
      router.push('/');
      
    } catch (err) {
      console.error("Signup error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        }
      });
      
      if (error) {
        console.error("Google signup error:", error.message);
        setError("Google signup failed. Please try again.");
      }
    } catch (err) {
      console.error("Exception during Google signup:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col md:flex-row bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden max-w-4xl w-full">
        {/* Left side: Motivational/hype text */}
        <div className="md:w-1/2 p-8 bg-gradient-to-br from-blue-500 to-blue-700 text-white flex items-center justify-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold mb-4">Welcome to DataViz!</h2>
            <p className="text-lg mb-2">Unlock powerful insights from your data.</p>
            <p className="text-lg animate-typewriter whitespace-nowrap overflow-hidden border-r-4 border-white pr-1">
              Create stunning, interactive charts...
            </p>
            <p className="text-lg animate-typewriter whitespace-nowrap overflow-hidden border-r-4 border-white pr-1">
              Analyze trends and make informed decisions.
            </p>
            <p className="text-lg animate-typewriter whitespace-nowrap overflow-hidden border-r-4 border-white pr-1">
              Experience enterprise-grade security.
            </p>
          </div>
        </div>
        
        {/* Right side: Signup form */}
        <div className="md:w-1/2 p-8">
          <h2 className="text-3xl font-bold mb-6 text-center dark:text-white">Sign Up</h2>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="flex space-x-2">
              <div className="w-1/2">
                <label className="block mb-1 dark:text-white">First Name</label>
                <input 
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="John"
                  disabled={loading}
                />
              </div>
              <div className="w-1/2">
                <label className="block mb-1 dark:text-white">Last Name</label>
                <input 
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Doe"
                  disabled={loading}
                />
              </div>
            </div>
            
            <div>
              <label className="block mb-1 dark:text-white">Email</label>
              <input 
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="your@email.com"
                disabled={loading}
              />
            </div>
            
            <div>
              <label className="block mb-1 dark:text-white">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="••••••••"
                  disabled={loading}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 dark:text-gray-400"
                >
                  {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </button>
              </div>
            </div>
            
            <button 
              type="submit" 
              className={`w-full ${loading ? 'bg-green-400' : 'bg-green-500 hover:bg-green-600'} text-white py-2 rounded transition-colors focus:outline-none focus:ring`}
              disabled={loading}
            >
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>
            
            <div className="text-center dark:text-white">
              <p className="text-sm">
                Already have an account? <Link href="/login" className="underline text-blue-500">Login</Link>
              </p>
            </div>
            
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-sm">
                  Or continue with
                </span>
              </div>
            </div>
            
            <button 
              type="button" 
              onClick={handleGoogleSignup}
              className={`w-full border border-gray-300 dark:border-gray-600 py-2 rounded flex items-center justify-center ${loading ? 'opacity-70' : 'hover:bg-gray-100 dark:hover:bg-gray-700'} transition-colors`}
              disabled={loading}
            >
              <FaGoogle className="mr-2 text-red-500" />
              <span className="dark:text-white">Sign up with Google</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}