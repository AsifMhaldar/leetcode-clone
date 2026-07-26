import React from 'react';
import { CERT_FAQS, CERT_FAQ_TITLE } from '../constants';
import './FAQ.scss';

export default function FAQ() {
  return (
    <div className="faq">
      <h2 className="faq__title">{CERT_FAQ_TITLE}</h2>
      
      <div className="faq__grid">
        {CERT_FAQS.map((faq, idx) => (
          <div key={idx} className="faq__item">
            <h3 className="faq__question">{faq.q}</h3>
            <p className="faq__answer">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
