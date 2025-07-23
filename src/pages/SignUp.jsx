import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from 'lucide-react';
import OAuth from '../components/OAuth';
import ImageCaptcha from '../components/capcha';
 const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleCaptchaVerify = (success) => {
    setCaptchaVerified(success);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!captchaVerified) {
      setShowCaptcha(true);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${backendUrl}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }

      setError(null);
      setLoading(false);
      navigate('/sign-in');
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center p-4">
      <motion.div className="max-w-md w-full space-y-8 bg-gray-900/50 p-8 rounded-2xl border border-blue-500/20 shadow-2xl">
        <motion.div className="text-center">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent mb-2">
            Create Account
          </h2>
          <p className="text-gray-400">Join AI Travel Planner today</p>
        </motion.div>

        {error && <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-2 rounded-lg">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username */}
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              id="username"
              placeholder="Username"
              className="w-full bg-gray-800/50 border border-gray-700 pl-10 pr-4 py-3 rounded-lg text-gray-300"
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="w-full bg-gray-800/50 border border-gray-700 pl-10 pr-4 py-3 rounded-lg text-gray-300"
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Password"
              className="w-full bg-gray-800/50 border border-gray-700 pl-10 pr-12 py-3 rounded-lg text-gray-300"
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* CAPTCHA */}
          {showCaptcha && (
            <div className="space-y-4">
              <ImageCaptcha onVerify={handleCaptchaVerify} />
            </div>
          )}

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading || (showCaptcha && !captchaVerified)}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 py-3 rounded-lg text-white font-medium shadow-lg transition-all disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Sign up'}
            <ArrowRight size={20} />
          </motion.button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-900/50 text-gray-400">Or continue with</span>
          </div>
        </div>

        <OAuth />

        <p className="text-center text-gray-400">
          Already have an account?{' '}
          <Link to="/sign-in" className="text-blue-400 hover:text-blue-300 font-medium">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
