import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here (to be integrated with backend later)
    console.log("Logging in with", email, password);
    
    // For demo purposes, simulate successful login
    router.push('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col md:flex-row bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden max-w-4xl w-full">
        {/* Left side: Motivational/hype text */}
        <div className="md:w-1/2 p-8 bg-gradient-to-br from-blue-500 to-blue-700 text-white flex items-center justify-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Welcome to DataViz!</h2>
            
            <div className="space-y-6 mt-6">
              {/* First animation */}
              <div className="overflow-hidden">
                <p className="text-lg animate-typewriter whitespace-nowrap overflow-hidden border-r-4 pr-1">
                  Unlock powerful insights from your data.
                </p>
              </div>
              
              {/* Second animation with delay */}
              <div className="overflow-hidden opacity-0 animate-fadeIn" style={{ animationDelay: "2s" }}>
                <p className="text-lg animate-typewriter2 whitespace-nowrap overflow-hidden border-r-4 border-white pr-1" style={{ animationDelay: "2s" }}>
                  Create stunning, interactive charts and graphs...
                </p>
              </div>
              
              {/* Third animation with more delay */}
              <div className="overflow-hidden opacity-0 animate-fadeIn" style={{ animationDelay: "4s" }}>
                <p className="text-lg animate-typewriter3 whitespace-nowrap overflow-hidden border-r-4 border-white pr-1" style={{ animationDelay: "4s" }}>
                  Automated data insights at your fingertips.
                </p>
              </div>
              
              
              
              <div className="mt-8 opacity-0 animate-fadeIn" style={{ animationDelay: "5s" }}>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="mr-2 text-green-300">✓</span>
                    <span>Easy to use interface</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-green-300">✓</span>
                    <span>Data visualization in seconds</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-green-300">✓</span>
                    <span>AI-powered data analysis</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-green-300">✓</span>
                    <span>100% free for everyone</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right side: Login form */}
        <div className="md:w-1/2 p-8">
          <h2 className="text-3xl font-bold mb-6 text-center dark:text-white">Login</h2>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block mb-1 dark:text-white">Email</label>
              <input 
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="your@email.com"
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
            
            <div className="text-right">
              <a href="#" className="text-blue-500 text-sm hover:underline">Forgot password?</a>
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors focus:outline-none focus:ring"
            >
              Login
            </button>
            
            <div className="text-center dark:text-white">
              <p className="text-sm">
                Don't have an account? <Link href="/signup"><span className="underline text-blue-500 cursor-pointer">Sign up</span></Link>
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
              className="w-full border border-gray-300 dark:border-gray-600 py-2 rounded flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <FaGoogle className="mr-2 text-red-500" />
              <span className="dark:text-white">Login with Google</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}