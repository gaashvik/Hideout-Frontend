import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';
import ImageCaptcha from '../components/capcha';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }

      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-gray-900/50 p-8 rounded-xl shadow-xl">
        <h1 className="text-3xl font-bold text-center text-white mb-4">Sign In</h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-700 rounded-lg bg-gray-700 text-white"
            id="email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-700 rounded-lg bg-gray-700 text-white"
            id="password"
            onChange={handleChange}
            required
          />

          {/* CAPTCHA */}
          {showCaptcha && <ImageCaptcha onVerify={handleCaptchaVerify} />}

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={loading || (showCaptcha && !captchaVerified)}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-lg uppercase font-semibold disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Sign In'}
          </button>
        </form>
        <div className="mt-4">
          <OAuth />
        </div>

        <div className="text-center mt-4 text-gray-400">
          <p>
            Don't have an account?{' '}
            <Link to="/sign-up" className="text-blue-400 hover:text-blue-300">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
