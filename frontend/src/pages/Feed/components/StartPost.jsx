import React from 'react';
import { useSelector } from 'react-redux';
import { ImagePlus, Video, Code2, BarChart3 } from 'lucide-react';
import './StartPost.scss';

const StartPost = ({ onOpenComposer }) => {
  const { user } = useSelector((state) => state.auth);

  const quickActions = [
    { icon: ImagePlus, label: 'Image', color: 'var(--accent-green)' },
    { icon: Video, label: 'Video', color: 'var(--accent-purple)' },
    { icon: Code2, label: 'Code', color: 'var(--accent-blue)' },
    { icon: BarChart3, label: 'Poll', color: 'var(--accent-yellow)' }
  ];

  return (
    <div className="start-post glass-card">
      <div className="start-post__input-row">
        <div className="start-post__avatar">
          {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
        </div>
        <button className="start-post__placeholder" onClick={onOpenComposer}>
          Start a post, {user?.firstName}...
        </button>
      </div>

      <div className="start-post__actions">
        {quickActions.map(({ icon: QuickIcon, label, color }) => (
          <button
            key={label}
            className="start-post__action-btn"
            onClick={onOpenComposer}
          >
            <QuickIcon size={16} style={{ color }} />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StartPost;
