import React from 'react';
import { Users, Video, Download, Award } from 'lucide-react';
import { COURSE_WHY_CHOOSE } from '../constants';
import './WhyChooseUs.scss';

const iconMap = [Users, Video, Download, Award];

export default function WhyChooseUs() {
  return (
    <div className="why-choose">
      {COURSE_WHY_CHOOSE.map((item, idx) => {
        const Icon = iconMap[idx];
        return (
          <div key={idx} className="why-choose__card">
            <div className="why-choose__icon"><Icon className="w-6 h-6" /></div>
            <h3 className="why-choose__title">{item.title}</h3>
            <p className="why-choose__desc">{item.description}</p>
          </div>
        );
      })}
    </div>
  );
}
