import React from 'react';
import { SKILL_PROGRESS_DATA } from '../constants';
import './SkillProgress.scss';

const SkillProgress = () => {
  return (
    <div className="skill-progress">
      {SKILL_PROGRESS_DATA.map((skill, idx) => (
        <div key={idx} className="skill-progress__card">
          <div className="skill-progress__header">
            <h3 className="skill-progress__title">{skill.title}</h3>
            <span className="skill-progress__percentage">{skill.percentage}</span>
          </div>
          <div className="skill-progress__bar">
            <div className={`skill-progress__fill bg-gradient-to-r ${skill.gradient}`} style={{ width: skill.width }}></div>
          </div>
          <div className="skill-progress__footer">
            <span>{skill.exercises}</span>
            <span className="skill-progress__change">{skill.change}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillProgress;
