import React from 'react';

const RankBadge = ({ rank }) => {
  if (rank === 1) return <span className="rank-badge rank-badge--gold">👑</span>;
  if (rank === 2) return <span className="rank-badge rank-badge--silver">🥈</span>;
  if (rank === 3) return <span className="rank-badge rank-badge--bronze">🥉</span>;
  return <span className="rank-badge rank-badge--number">{rank}</span>;
};

export default RankBadge;
