import React from 'react';
import { Rocket } from 'lucide-react';

export default function CertCTA() {
  return (
    <div className="mt-12 text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Start Your Journey?</h2>
      <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
        Join thousands of professionals who have transformed their careers with our certifications.
      </p>
      <button className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden">
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity"></span>
        <span className="relative flex items-center">
          <Rocket className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
          Get Started Today
        </span>
      </button>
      <p className="text-gray-500 text-sm mt-4">
        No credit card required • 30-day money-back guarantee
      </p>
    </div>
  );
}
