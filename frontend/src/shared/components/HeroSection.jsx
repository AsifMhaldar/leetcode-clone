import { Sparkles } from 'lucide-react';

const HeroSection = ({
  gradient = 'from-blue-600 via-purple-600 to-pink-600',
  badgeIcon,
  badgeText,
  titleLine1,
  titleLine2,
  description,
  primaryCtaLabel,
  primaryCtaIcon,
  primaryCtaColor = 'text-purple-600',
  secondaryCtaLabel,
  secondaryCtaIcon,
  secondaryCtaIconHover = 'group-hover:scale-110',
  stats,
  maxWidth
}) => {
  return (
    <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-r ${gradient} p-8 md:p-12 mb-8`}>
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
      
      <div className={`relative z-10${maxWidth ? ` ${maxWidth}` : ''}`}>
        {badgeIcon && badgeText && (
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            {badgeIcon}
            <span className="text-sm font-medium text-white">{badgeText}</span>
          </div>
        )}
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          {titleLine1} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-pink-200">
            {titleLine2}
          </span>
        </h1>
        
        <p className="text-xl text-white/90 mb-8 max-w-2xl">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-4">
          <button className={`group relative inline-flex items-center px-6 py-3.5 bg-white ${primaryCtaColor} rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden`}>
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-100 to-pink-100 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            <span className="relative flex items-center">
              {primaryCtaIcon}
              {primaryCtaLabel}
            </span>
          </button>
          <button className="group relative inline-flex items-center px-6 py-3.5 bg-white/10 backdrop-blur-sm text-white rounded-xl font-bold hover:bg-white/20 transition-all duration-300">
            {secondaryCtaIcon}
            <span className={secondaryCtaIconHover ? '' : ''}>{secondaryCtaLabel}</span>
          </button>
        </div>

        {stats && stats.length > 0 && (
          <div className="flex flex-wrap items-center gap-6 mt-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                {stat.icon}
                <span className="text-sm text-white/80">{stat.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
