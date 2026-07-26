import React from 'react';
import { Inbox } from 'lucide-react';
import './EmptyState.scss';

const EmptyState = ({ icon: Icon = Inbox, title, description }) => (
  <div className="empty-state">
    <div className="empty-state__icon-wrap">
      <Icon size={32} />
    </div>
    <h4 className="empty-state__title">{title}</h4>
    {description && <p className="empty-state__desc">{description}</p>}
  </div>
);

export default EmptyState;
