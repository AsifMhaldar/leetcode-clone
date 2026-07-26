import React from 'react';
import { useChatAi } from './hooks/useChatAi';
import MessageList from './components/MessageList';
import ChatInput from './components/ChatInput';
import './ChatAi.scss';

function ChatAi({ problem }) {
  const {
    messages,
    register,
    handleSubmit,
    errors,
    messagesEndRef,
    onSubmit
  } = useChatAi(problem);

  return (
    <div className="chat-ai">
      <MessageList messages={messages} messagesEndRef={messagesEndRef} />
      <ChatInput 
        register={register} 
        handleSubmit={handleSubmit} 
        errors={errors} 
        onSubmit={onSubmit} 
      />
    </div>
  );
}

export default ChatAi;
