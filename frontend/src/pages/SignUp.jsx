import axios from 'axios';
import React, { useState } from 'react';
import Spinner from '../components/Spinner';
import { useNavigate, Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { SiBookstack } from 'react-icons/si';
import { AiOutlineUser, AiOutlineMail, AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSignUp = (e) => {
    e.preventDefault();
    
    if (!username || !email || !password) {
      enqueueSnackbar('Please fill in all fields', { variant: 'warning' });
      return;
    }

    if (password.length < 6) {
      enqueueSnackbar('Password must be at least 6 characters', { variant: 'warning' });
      return;
    }

    const data = {
      username,
      email,
      password
    }

    setLoading(true);
    axios
      .post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/auth/signup`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Account created successfully! Welcome to BookSwap 🎉', { variant: 'success' });
        navigate('/login');
      })
      .catch((error) => {
        setLoading(false);
      
        if (error.response) {
          const status = error.response.status;
          const data = error.response.data;
      
          if (status === 409) {
            if (data.message === 'email exists') {
              enqueueSnackbar('Email already in use', { variant: 'error' });
            } else if (data.message === 'username exists') {
              enqueueSnackbar('Username already in use', { variant: 'error' });
            }
          } else {
            enqueueSnackbar('An error occurred during registration', { variant: 'error' });
          }
        } else if (error.request) {
          enqueueSnackbar('Network error. Please check your connection.', { variant: 'error' });
        } else {
          enqueueSnackbar('An unexpected error occurred', { variant: 'error' });
        }
      
        console.log(error);
      });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {loading && <Spinner />}
      
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl flex items-center justify-center">
              <SiBookstack className="text-white text-2xl" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              BookSwap
            </span>
          </Link>
          
          <h2 className="text-3xl font-bold text-gray-900">Join BookSwap</h2>
          <p className="mt-2 text-gray-600">
            Create your account and start swapping books today
          </p>
        </div>

        {/* Signup Form */}
        <div className="card-hover bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <form className="space-y-6" onSubmit={handleSignUp}>
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <AiOutlineUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="username"
                  className="form-input pl-10"
                  placeholder="Choose a username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                This will be your display name on BookSwap
              </p>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <AiOutlineMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  className="form-input pl-10"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <AiOutlineLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="form-input pl-10 pr-10"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength="6"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <AiOutlineEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Must be at least 6 characters long
              </p>
            </div>

            {/* Terms Agreement */}
            <div className="flex items-center">
              <input
                id="terms"
                type="checkbox"
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                required
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                I agree to the{' '}
                <a href="#" className="text-green-600 hover:text-green-500 font-medium">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-green-600 hover:text-green-500 font-medium">
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transform hover:-translate-y-0.5 transition-all duration-200 shadow-lg"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Creating Account...
                </>
              ) : (
                'Create BookSwap Account'
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="font-semibold text-green-600 hover:text-green-500 transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        {/* Benefits */}
        <div className="card-hover bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-3">Why Join BookSwap?</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Swap books with readers worldwide</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Discover new books for free</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Build your reading community</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Eco-friendly way to read more</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SignUp;