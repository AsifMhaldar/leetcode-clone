import React from 'react';
import { useLogin } from './hooks/useLogin';
import AuthBranding from './components/AuthBranding';
import LoginForm from './components/LoginForm';

const loginFeatures = [
  'Track your progress',
  'Access 500+ challenges',
  'Compete with peers'
];

function Login() {
  const {
    showPassword,
    setShowPassword,
    loading,
    error,
    register,
    handleSubmit,
    errors,
    onSubmit
  } = useLogin();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-10 animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-10 animate-pulse-medium"></div>
        <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-5 animate-float-slow"></div>
        
        <div className="absolute top-20 left-20 text-3xl text-purple-400/20 animate-bounce-slow">{`{ }`}</div>
        <div className="absolute bottom-32 right-32 text-3xl text-blue-400/20 animate-bounce-medium">{`< />`}</div>
        <div className="absolute top-40 right-40 text-2xl text-cyan-400/20 animate-bounce-fast">{`[ ]`}</div>
        <div className="absolute bottom-40 left-40 text-2xl text-indigo-400/20 animate-bounce-slow">{`( )`}</div>
        
        <div className="absolute top-10 left-1/4 text-lg text-green-400/10 animate-pulse-fast">1010</div>
        <div className="absolute top-32 right-1/3 text-lg text-green-400/10 animate-pulse-medium">1101</div>
        <div className="absolute bottom-20 left-1/3 text-lg text-green-400/10 animate-pulse-slow">0110</div>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-6xl mx-auto relative z-10">
        <AuthBranding
          heading="Welcome Back"
          subheading="Continue your coding journey and master new challenges every day."
          features={loginFeatures}
        />
        <LoginForm
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          loading={loading}
          error={error}
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
          onSubmit={onSubmit}
        />
      </div>

      <style jsx>{`
        @keyframes float-in { 0% { opacity: 0; transform: translateY(50px) scale(0.9); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes slide-in-left { 0% { opacity: 0; transform: translateX(-100px); } 100% { opacity: 1; transform: translateX(0); } }
        @keyframes slide-in-right { 0% { opacity: 0; transform: translateX(100px); } 100% { opacity: 1; transform: translateX(0); } }
        @keyframes slide-in-up { 0% { opacity: 0; transform: translateY(30px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes float-slow { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-30px) rotate(180deg); } }
        @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
        @keyframes bounce-medium { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        @keyframes bounce-fast { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes pulse-slow { 0%, 100% { transform: scale(1); opacity: 0.1; } 50% { transform: scale(1.2); opacity: 0.15; } }
        @keyframes pulse-medium { 0%, 100% { transform: scale(1); opacity: 0.1; } 50% { transform: scale(1.1); opacity: 0.12; } }
        @keyframes pulse-fast { 0%, 100% { opacity: 0.1; } 50% { opacity: 0.2; } }
        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-8px); } 75% { transform: translateX(8px); } }
        @keyframes fade-in { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-float-in { animation: float-in 0.8s ease-out; }
        .animate-slide-in-left { animation: slide-in-left 0.8s ease-out 0.2s both; }
        .animate-slide-in-right { animation: slide-in-right 0.8s ease-out 0.4s both; }
        .animate-slide-in-up { animation: slide-in-up 0.8s ease-out 0.6s both; }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 6s ease-in-out infinite; }
        .animate-bounce-medium { animation: bounce-medium 4s ease-in-out infinite; }
        .animate-bounce-fast { animation: bounce-fast 3s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 6s ease-in-out infinite; }
        .animate-pulse-medium { animation: pulse-medium 4s ease-in-out infinite; }
        .animate-pulse-fast { animation: pulse-fast 2s ease-in-out infinite; }
        .animate-shake { animation: shake 0.5s ease-in-out; }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
        .animate-fade-in-delay { animation: fade-in 0.3s ease-out 0.8s both; }
      `}</style>
    </div>
  );
}

export default Login;
