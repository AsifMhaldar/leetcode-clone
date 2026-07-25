import React from 'react';
import { NavLink } from 'react-router';

const LoginForm = ({
  showPassword,
  setShowPassword,
  loading,
  error,
  register,
  handleSubmit,
  errors,
  onSubmit
}) => {
  return (
    <div className="lg:w-1/2 w-full max-w-md animate-float-in">
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 shadow-2xl hover:shadow-3xl transition-all duration-500">
        
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-2">Welcome Back</h3>
          <p className="text-gray-400">Sign in to your account</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg animate-shake">
            <div className="flex items-center space-x-2 text-red-400">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">{error}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          <div className="form-group animate-slide-in-right">
            <label className="block text-white/80 text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="john@example.com"
              className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                errors.emailId 
                  ? 'border-red-500 focus:ring-red-500 animate-shake' 
                  : 'border-white/20 focus:ring-purple-500 focus:border-purple-500'
              }`}
              {...register('emailId')}
            />
            {errors.emailId && (
              <span className="text-red-400 text-sm mt-1 animate-fade-in block">
                {errors.emailId.message}
              </span>
            )}
          </div>

          <div className="form-group animate-slide-in-left">
            <label className="block text-white/80 text-sm font-medium mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 pr-12 ${
                  errors.password 
                    ? 'border-red-500 focus:ring-red-500 animate-shake' 
                    : 'border-white/20 focus:ring-purple-500 focus:border-purple-500'
                }`}
                {...register('password')}
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 hover:text-white transition-all duration-300 p-1 rounded-lg hover:bg-white/10"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <span className="text-red-400 text-sm mt-1 animate-fade-in block">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between animate-fade-in">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" className="checkbox checkbox-sm bg-white/10 border-white/20" />
              <span className="text-sm text-gray-400">Remember me</span>
            </label>
            <a href="#" className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-300">
              Forgot password?
            </a>
          </div>
          
          <div className="animate-slide-in-up">
            <button
              type="submit"
              className={`w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg transition-all duration-500 hover:shadow-2xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-500/50 ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Signing In...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </div>
        </form>

        <div className="text-center mt-6 animate-fade-in-delay">
          <span className="text-gray-400 text-sm">
            Don't have an account?{' '}
            <NavLink 
              to="/signup" 
              className="text-blue-400 hover:text-blue-300 font-medium transition-all duration-300 hover:underline"
            >
              Create Account
            </NavLink>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
