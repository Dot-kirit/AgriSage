import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Sprout } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div 
      className="relative min-h-screen w-full flex items-center justify-center p-4 bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: `radial-gradient(circle at center, rgba(15, 23, 19, 0.45), rgba(15, 23, 19, 0.85)), url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=2000&q=80')`,
      }}
    >
      <div className="w-full max-w-md bg-white/95 dark:bg-[#16231D]/95 backdrop-blur-xl border border-white/40 dark:border-[#273E34] rounded-3xl p-8 shadow-2xl transition-all">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-14 h-14 rounded-full bg-[#E1F2E6] dark:bg-[#1D3A29] flex items-center justify-center text-[#2F7E4A] dark:text-[#67B781] mb-2.5 shadow-sm">
            <Sprout className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-extrabold text-[#1A2E22] dark:text-[#E5EFEA]">AgriSage</h1>
          <p className="text-xs text-[#52665B] dark:text-[#8CA397] mt-0.5 font-medium">Smart Insights for Smarter Farming</p>
        </div>

        <div className="text-center mb-5">
          <h2 className="text-lg font-bold text-[#1A2E22] dark:text-[#E5EFEA]">Welcome Back!</h2>
          <p className="text-xs text-[#52665B] dark:text-[#8CA397]">Login to continue to AgriSage</p>
        </div>

        <form onSubmit={handleAuth} className="space-y-3.5">
          <div className="relative">
            <Mail className="w-4 h-4 text-[#8CA397] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#F8FAF9] dark:bg-[#0F1713] text-[#1A2E22] dark:text-[#E5EFEA] border border-[#E5ECE8] dark:border-[#273E34] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#419C5F]/50 transition-all"
            />
          </div>

          <div className="relative">
            <Lock className="w-4 h-4 text-[#8CA397] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 text-xs bg-[#F8FAF9] dark:bg-[#0F1713] text-[#1A2E22] dark:text-[#E5EFEA] border border-[#E5ECE8] dark:border-[#273E34] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#419C5F]/50 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8CA397] hover:text-[#52665B]"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-[#419C5F] hover:bg-[#2F7E4A] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all mt-2"
          >
            <span>Login to Dashboard</span>
          </button>
        </form>

        <div className="relative my-4 flex items-center justify-center">
          <div className="border-t border-[#E5ECE8] dark:border-[#273E34] w-full" />
          <span className="bg-white dark:bg-[#16231D] px-2 text-[10px] text-[#8CA397] uppercase tracking-wider absolute">or</span>
        </div>

        <button
          onClick={handleAuth}
          className="w-full py-2.5 px-4 bg-white dark:bg-[#0F1713] text-[#1A2E22] dark:text-[#E5EFEA] border border-[#E5ECE8] dark:border-[#273E34] hover:bg-[#F2F9F4] dark:hover:bg-[#1D2F27] text-xs font-medium rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
          </svg>
          <span>Sign in with Google</span>
        </button>

        <p className="text-[10px] text-center text-[#8CA397] mt-5 leading-relaxed">
          By continuing, you agree to our Terms of Use and Privacy Policy.
        </p>
      </div>
    </div>
  );
}