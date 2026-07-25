import React from 'react';
import { Send } from 'lucide-react';

const ChatInput = ({ register, handleSubmit, errors, onSubmit }) => {
  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="sticky bottom-0 p-4 bg-base-100 border-t"
    >
      <div className="flex items-center">
        <input 
          placeholder="Ask me anything" 
          className="input input-bordered flex-1" 
          {...register("message", { required: true, minLength: 2 })}
        />
        <button 
          type="submit" 
          className="btn btn-ghost ml-2"
          disabled={errors.message}
        >
          <Send size={20} />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
