import React from 'react';
import { EMPTY_STATE_TEXT } from '../constants';
import './MessageList.scss';

const MessageList = ({ messages, messagesEndRef }) => {
  return (
    <div className="message-list">
      {messages.length === 0 && (
        <div className="message-list__empty">
          {EMPTY_STATE_TEXT}
        </div>
      )}
      {messages.map((msg, index) => (
        <div 
          key={index} 
          className={`message-list__item ${msg.role === "user" ? "message-list__item--user" : "message-list__item--assistant"}`}
        >
          <div className={`message-list__bubble ${msg.role === "user" ? "message-list__bubble--user" : "message-list__bubble--assistant"}`}>
            {msg.parts[0].text}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
