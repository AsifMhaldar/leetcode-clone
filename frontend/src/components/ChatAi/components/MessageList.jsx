import React from 'react';

const MessageList = ({ messages, messagesEndRef }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((msg, index) => (
        <div 
          key={index} 
          className={`chat ${msg.role === "user" ? "chat-end" : "chat-start"}`}
        >
          <div className="chat-bubble bg-base-200 text-base-content">
            {msg.parts[0].text}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
