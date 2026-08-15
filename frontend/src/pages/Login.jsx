import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { useSnackbar } from 'notistack';
import { UserContext } from '../context/UserContext';
import { SiBookstack } from 'react-icons/si';
import { AiOutlineUser, AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { setUserData } = useContext(UserContext);
   
  const handleLogin = (e) => {
    e.preventDefault();

    if (!username || !password) {
      enqueueSnackbar('Please fill in all fields', { variant: 'warning' });
      return;
    }

    const data = {
      username,
      password,
    }

    setLoading(true);
    axios
      .post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/auth/login`, data)
      .then((response) => {
        setLoading(false);
        if (
          response.data.message === 'No user found' ||
          response.data.message === 'invalid password'
        ) { 
          enqueueSnackbar('Invalid username or password', { variant: 'error'});
        } else {
          const { userPageData, token } = response.data;
          setUserData(userPageData);
          sessionStorage.setItem('token', token);
          enqueueSnackbar('Welcome back!', { variant: 'success'});
          navigate('/');
        }
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Login failed. Please try again.', { variant: 'error' });
        console.log(error);
      });
  }

  return (
    <div className="min-h-screen bg-[#F8F7F4] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {loading && <Spinner />}
      
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-[#9A3412] rounded-xl flex items-center justify-center">
              <SiBookstack className="text-white text-2xl" />
            </div>
            <span className="text-2xl font-bold bg-[#9A3412] bg-clip-text text-transparent">
              BookSwap
            </span>
          </Link>
          
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="mt-2 text-gray-600">
            Sign in to your account to continue swapping books
          </p>
        </div>

        {/* Login Form */}
        <div className="card-hover bg-white rounded-2xl shadow-sm border border-[#E8EDE5] p-8">
          <form className="space-y-6" onSubmit={handleLogin}>
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
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
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
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#9A3412] focus:ring-[#9A3412] border-[#E8EDE5] rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-[#9A3412] hover:text-[#7C2D12]">
                  Forgot your password?
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full btn btn-primary py-3 text-lg font-semibold"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing in...
                </>
              ) : (
                'Sign in to BookSwap'
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link 
                to="/signup" 
                className="font-semibold text-[#9A3412] hover:text-[#7C2D12] transition-colors"
              >
                Create one now
              </Link>
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;