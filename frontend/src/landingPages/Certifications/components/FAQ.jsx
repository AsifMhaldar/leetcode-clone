import React from 'react';
import { faqs } from '../data/certifications';

export default function FAQ() {
  return (
    <div className="mt-12 bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {faqs.map((faq, idx) => (
          <div key={idx} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all">
            <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
            <p className="text-gray-600 text-sm">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
