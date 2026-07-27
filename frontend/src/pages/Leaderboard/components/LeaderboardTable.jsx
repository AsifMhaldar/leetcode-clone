import React from 'react';
import { Flame, Trophy } from 'lucide-react';
import RankBadge from './RankBadge';
import './LeaderboardTable.scss';

const LeaderboardTable = ({ data, isLoading, error, onRetry }) => {
  if (isLoading) {
    return (
      <div className="lb-table">
        <table className="lb-table__table">
          <thead>
            <tr>
              <th className="lb-table__th">Rank</th>
              <th className="lb-table__th">User</th>
              <th className="lb-table__th">Score</th>
              <th className="lb-table__th">Solved</th>
              <th className="lb-table__th">Streak</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 10 }).map((_, i) => (
              <tr key={i} className="lb-table__row lb-table__row--skeleton">
                <td className="lb-table__td"><div className="lb-table__skeleton-circle"></div></td>
                <td className="lb-table__td"><div className="lb-table__skeleton-text"></div></td>
                <td className="lb-table__td"><div className="lb-table__skeleton-text"></div></td>
                <td className="lb-table__td"><div className="lb-table__skeleton-text"></div></td>
                <td className="lb-table__td"><div className="lb-table__skeleton-text"></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (error) {
    return (
      <div className="lb-table lb-table--empty">
        <Trophy className="lb-table__empty-icon" />
        <p>Failed to load leaderboard</p>
        <p className="lb-table__empty-hint">{error.message || 'Check your connection and try again'}</p>
        {onRetry && (
          <button className="lb-table__retry-btn" onClick={onRetry}>
            Retry
          </button>
        )}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="lb-table lb-table--empty">
        <Trophy className="lb-table__empty-icon" />
        <p>No rankings yet</p>
      </div>
    );
  }

  return (
    <div className="lb-table">
      <table className="lb-table__table">
        <thead>
          <tr>
            <th className="lb-table__th">Rank</th>
            <th className="lb-table__th">User</th>
            <th className="lb-table__th">Score</th>
            <th className="lb-table__th">Solved</th>
            <th className="lb-table__th">Streak</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => {
            const user = entry.user || entry.userId;
            const rank = entry.rank || index + 1;
            const rowClass = rank <= 3 ? `lb-table__row lb-table__row--top${rank}` : 'lb-table__row';

            return (
              <tr key={entry._id || entry.userId?._id || index} className={rowClass}>
                <td className="lb-table__td">
                  <RankBadge rank={rank} />
                </td>
                <td className="lb-table__td">
                  <div className="lb-table__user">
                    <div className="lb-table__avatar">
                      {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                    </div>
                    <div className="lb-table__user-info">
                      <span className="lb-table__name">{user?.firstName} {user?.lastName}</span>
                      <span className="lb-table__email">{user?.emailId}</span>
                    </div>
                  </div>
                </td>
                <td className="lb-table__td">
                  <span className="lb-table__score">{entry.points}</span>
                </td>
                <td className="lb-table__td">
                  <div className="lb-table__solved">
                    <span className="lb-table__solved-count">{entry.easyCount + entry.mediumCount + entry.hardCount}</span>
                    <div className="lb-table__difficulty-dots">
                      {entry.easyCount > 0 && <span className="lb-table__dot lb-table__dot--easy" title={`${entry.easyCount} Easy`}></span>}
                      {entry.mediumCount > 0 && <span className="lb-table__dot lb-table__dot--medium" title={`${entry.mediumCount} Medium`}></span>}
                      {entry.hardCount > 0 && <span className="lb-table__dot lb-table__dot--hard" title={`${entry.hardCount} Hard`}></span>}
                    </div>
                  </div>
                </td>
                <td className="lb-table__td">
                  <div className="lb-table__streak">
                    {entry.streak > 0 && <Flame className="lb-table__streak-icon" />}
                    <span>{entry.streak}</span>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardTable;
