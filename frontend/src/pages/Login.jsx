import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router'; 
import { loginUser } from "../authSlice";
import { useEffect, useState } from 'react';

const loginSchema = z.object({
  emailId: z.string().email("Invalid Email"),
  password: z.string().min(8, "Password is too weak") 
});

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-10 animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-10 animate-pulse-medium"></div>
        <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-5 animate-float-slow"></div>
        
        {/* Floating Code Elements */}
        <div className="absolute top-20 left-20 text-3xl text-purple-400/20 animate-bounce-slow">{`{ }`}</div>
        <div className="absolute bottom-32 right-32 text-3xl text-blue-400/20 animate-bounce-medium">{`< />`}</div>
        <div className="absolute top-40 right-40 text-2xl text-cyan-400/20 animate-bounce-fast">{`[ ]`}</div>
        <div className="absolute bottom-40 left-40 text-2xl text-indigo-400/20 animate-bounce-slow">{`( )`}</div>
        
        {/* Binary Rain Effect */}
        <div className="absolute top-10 left-1/4 text-lg text-green-400/10 animate-pulse-fast">1010</div>
        <div className="absolute top-32 right-1/3 text-lg text-green-400/10 animate-pulse-medium">1101</div>
        <div className="absolute bottom-20 left-1/3 text-lg text-green-400/10 animate-pulse-slow">0110</div>
      </div>

      {/* Main Content Container */}
      <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-6xl mx-auto relative z-10">
        
        {/* Left Side - Branding */}
        <div className="lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0 lg:pr-12 animate-slide-in-left">
          <div className="flex items-center justify-center lg:justify-start space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Codify-CODE
            </h1>
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Welcome Back
          </h2>
          
          <p className="text-xl text-gray-300 mb-8 max-w-md mx-auto lg:mx-0">
            Continue your coding journey and master new challenges every day.
          </p>
          
          {/* Features List */}
          <div className="space-y-4 text-left max-w-sm mx-auto lg:mx-0">
            <div className="flex items-center space-x-3 text-gray-300">
              <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span>Track your progress</span>
            </div>
            
            <div className="flex items-center space-x-3 text-gray-300">
              <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span>Access 500+ challenges</span>
            </div>
            
            <div className="flex items-center space-x-3 text-gray-300">
              <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span>Compete with peers</span>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="lg:w-1/2 w-full max-w-md animate-float-in">
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 shadow-2xl hover:shadow-3xl transition-all duration-500">
            
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Welcome Back</h3>
              <p className="text-gray-400">Sign in to your account</p>
            </div>

            {/* Display server errors */}
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
              
              {/* Email Field */}
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

              {/* Password Field */}
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

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between animate-fade-in">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="checkbox checkbox-sm bg-white/10 border-white/20" />
                  <span className="text-sm text-gray-400">Remember me</span>
                </label>
                <a href="#" className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-300">
                  Forgot password?
                </a>
              </div>
              
              {/* Submit Button */}
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

            {/* Signup Redirect */}
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
      </div>

      {/* Enhanced Custom Animations */}
      <style jsx>{`
        @keyframes float-in {
          0% {
            opacity: 0;
            transform: translateY(50px) scale(0.9);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes slide-in-left {
          0% {
            opacity: 0;
            transform: translateX(-100px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slide-in-right {
          0% {
            opacity: 0;
            transform: translateX(100px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slide-in-up {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) rotate(180deg);
          }
        }
        
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        @keyframes bounce-medium {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        
        @keyframes bounce-fast {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% {
            transform: scale(1);
            opacity: 0.1;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.15;
          }
        }
        
        @keyframes pulse-medium {
          0%, 100% {
            transform: scale(1);
            opacity: 0.1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.12;
          }
        }
        
        @keyframes pulse-fast {
          0%, 100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.2;
          }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
        
        @keyframes fade-in {
          from { 
            opacity: 0; 
            transform: translateY(-10px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        .animate-float-in {
          animation: float-in 0.8s ease-out;
        }
        
        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out 0.2s both;
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out 0.4s both;
        }
        
        .animate-slide-in-up {
          animation: slide-in-up 0.8s ease-out 0.6s both;
        }
        
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 6s ease-in-out infinite;
        }
        
        .animate-bounce-medium {
          animation: bounce-medium 4s ease-in-out infinite;
        }
        
        .animate-bounce-fast {
          animation: bounce-fast 3s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
        
        .animate-pulse-medium {
          animation: pulse-medium 4s ease-in-out infinite;
        }
        
        .animate-pulse-fast {
          animation: pulse-fast 2s ease-in-out infinite;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        .animate-fade-in-delay {
          animation: fade-in 0.3s ease-out 0.8s both;
        }
      `}</style>
    </div>
  );
}

export default Login;