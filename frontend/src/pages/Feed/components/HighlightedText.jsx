import React from 'react';
import { Link } from 'react-router';
import './HighlightedText.scss';

const tokenize = (text) => {
  const parts = [];
  const regex = /(@[A-Za-z0-9_.]+|#[A-Za-z0-9_]+)/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: 'text', value: text.slice(lastIndex, match.index) });
    }
    const token = match[0];
    parts.push({ type: token[0] === '@' ? 'mention' : 'hashtag', value: token });
    lastIndex = match.index + token.length;
  }

  if (lastIndex < text.length) {
    parts.push({ type: 'text', value: text.slice(lastIndex) });
  }

  return parts;
};

const HighlightedText = ({ text }) => {
  if (!text) return null;

  const parts = tokenize(text);

  return (
    <>
      {parts.map((part, i) => {
        if (part.type === 'mention') {
          return (
            <Link
              key={i}
              to={`/user/${part.value.slice(1)}`}
              className="highlighted-text__mention"
            >
              {part.value}
            </Link>
          );
        }
        if (part.type === 'hashtag') {
          return (
            <Link
              key={i}
              to={`/problems?tag=${encodeURIComponent(part.value.slice(1))}`}
              className="highlighted-text__hashtag"
            >
              {part.value}
            </Link>
          );
        }
        return <span key={i}>{part.value}</span>;
      })}
    </>
  );
};

export default HighlightedText;
