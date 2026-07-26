import React from 'react';
import { TrendingUp, DollarSign, ThumbsUp } from 'lucide-react';
import { CERT_WHY_REASONS } from '../constants';
import './WhyCertified.scss';

const iconMap = [TrendingUp, DollarSign, ThumbsUp];

export default function WhyCertified() {
  return (
    <div className="why-certified">
      {CERT_WHY_REASONS.map((reason, idx) => {
        const Icon = iconMap[idx];
        return (
          <div key={idx} className="why-certified__card">
            <div className={`why-certified__icon bg-gradient-to-r ${reason.color}`}>
              <Icon className="w-8 h-8 text-white" />
            </div>
            <h3 className="why-certified__title">{reason.title}</h3>
            <p className="why-certified__desc">{reason.description}</p>
          </div>
        );
      })}
    </div>
  );
}
