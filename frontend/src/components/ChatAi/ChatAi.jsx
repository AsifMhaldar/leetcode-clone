import React from 'react';
import { useChatAi } from './hooks/useChatAi';
import MessageList from './components/MessageList';
import ChatInput from './components/ChatInput';

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
    <div className="flex flex-col h-screen max-h-[80vh] min-h-[500px]">
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
