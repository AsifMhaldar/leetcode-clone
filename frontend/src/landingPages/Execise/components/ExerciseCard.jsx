import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle, Clock, Star, Users, ArrowRight, Award as AwardIcon
} from 'lucide-react';
import { EXERCISE_CARD_SOLVED_LABEL, EXERCISE_CARD_PREMIUM_LABEL, EXERCISE_CARD_SOLVE_LINK } from '../constants';
import './ExerciseCard.scss';

const ExerciseCard = ({ exercise, viewMode, getDifficultyColor, getCategoryIcon }) => {
  return (
    <div className={`exercise-card ${viewMode === 'list' ? 'exercise-card--list' : ''}`}>
      <div className={`exercise-card__body ${viewMode === 'list' ? 'exercise-card__body--list' : ''}`}>
        <div className="exercise-card__top">
          <div className="exercise-card__info">
            <div className={`exercise-card__icon ${
              exercise.difficulty === 'Easy' ? 'exercise-card__icon--easy' :
              exercise.difficulty === 'Medium' ? 'exercise-card__icon--medium' : 'exercise-card__icon--hard'
            }`}>
              {exercise.icon}
            </div>
            <div>
              <div className="exercise-card__title-row">
                <h3 className="exercise-card__title">{exercise.title}</h3>
                {exercise.solved && (
                  <span className="exercise-card__solved-badge">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    {EXERCISE_CARD_SOLVED_LABEL}
                  </span>
                )}
                {exercise.premium && (
                  <span className="exercise-card__premium-badge">
                    <AwardIcon className="w-3 h-3 mr-1" />
                    {EXERCISE_CARD_PREMIUM_LABEL}
                  </span>
                )}
              </div>
              <div className="exercise-card__difficulty-row">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(exercise.difficulty)}`}>
                  {exercise.difficulty}
                </span>
                <span className="exercise-card__time">
                  <Clock className="w-3.5 h-3.5 mr-1" />
                  {exercise.timeEstimate}
                </span>
              </div>
            </div>
          </div>
          <div className="exercise-card__rating">
            <Star className="w-4 h-4 fill-current" />
            <span className="exercise-card__rating-value">{exercise.rating}</span>
          </div>
        </div>

        <p className="exercise-card__description line-clamp-2">
          {exercise.description}
        </p>

        <div className="exercise-card__tags">
          {exercise.tags.map((tag, idx) => (
            <span key={idx} className="exercise-card__tag">#{tag}</span>
          ))}
        </div>

        <div className="exercise-card__footer">
          <div className="exercise-card__stats">
            <span className="exercise-card__stat">
              <Users className="w-4 h-4 mr-1" />
              {exercise.completions} solves
            </span>
            <span className="exercise-card__category">
              {getCategoryIcon(exercise.category)}
              <span className="ml-1">{exercise.category}</span>
            </span>
          </div>

          <Link to={`/exercises/${exercise.id}`} className="exercise-card__solve-link">
            {EXERCISE_CARD_SOLVE_LINK}
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExerciseCard;
