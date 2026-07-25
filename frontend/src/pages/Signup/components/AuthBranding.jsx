import React from 'react';

const AuthBranding = ({ heading, subheading, features }) => {
  return (
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
        {heading}
      </h2>
      
      <p className="text-xl text-gray-300 mb-8 max-w-md mx-auto lg:mx-0">
        {subheading}
      </p>
      
      <div className="space-y-4 text-left max-w-sm mx-auto lg:mx-0">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center space-x-3 text-gray-300">
            <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span>{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuthBranding;
