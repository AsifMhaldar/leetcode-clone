import React from 'react';
import { Star } from 'lucide-react';
import { testimonials } from '../data/certifications';

export default function Testimonials() {
  return (
    <div className="mt-12 bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 rounded-3xl p-8 md:p-12 text-white">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">What Our Certified Professionals Say</h2>
        <p className="text-purple-200">Join 100,000+ successful career changers</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, idx) => (
          <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">
                {testimonial.image}
              </div>
              <div>
                <h4 className="font-bold">{testimonial.name}</h4>
                <p className="text-sm text-purple-200">{testimonial.role}</p>
              </div>
            </div>
            <p className="text-white/90 mb-4">"{testimonial.text}"</p>
            <div className="flex text-yellow-300">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
