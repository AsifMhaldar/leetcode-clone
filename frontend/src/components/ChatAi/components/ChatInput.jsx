import React from 'react';
import { Send } from 'lucide-react';
import { INPUT_PLACEHOLDER } from '../constants';
import './ChatInput.scss';

const ChatInput = ({ register, handleSubmit, errors, onSubmit }) => {
  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="chat-input"
    >
      <div className="chat-input__form">
        <input 
          placeholder={INPUT_PLACEHOLDER} 
          className="chat-input__field" 
          {...register("message", { required: true, minLength: 2 })}
        />
        <button 
          type="submit" 
          className="chat-input__send"
          disabled={errors.message}
        >
          <Send size={20} />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
