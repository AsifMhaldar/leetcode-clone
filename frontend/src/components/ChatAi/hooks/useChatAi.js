import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import axiosClient from "../../../utils/axiosClient";

export const useChatAi = (problem) => {
  const [messages, setMessages] = useState([
    { role: 'model', parts:[{text: "Hello! I am your AI assistant. How can I help you today?"}]},
    { role: 'user', parts:[{text: "Explain the problem statement"}]},
  ]);

  const { register, handleSubmit, reset, formState: {errors} } = useForm();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const onSubmit = async (data) => {
    setMessages(prev => [...prev, { role: 'user', parts:[{text: data.message}] }]);
    reset();

    try {
      const response = await axiosClient.post("/ai/chat", {
        messages: messages,
        title: problem.title,
        description: problem.description,
        testCases: problem.visibleTestCases,
        startCode: problem.startCode
      });

      setMessages(prev => [...prev, { 
        role: 'model', 
        parts:[{text: response.data.message}] 
      }]);
    } catch (error) {
      console.error("API Error:", error);
      setMessages(prev => [...prev, { 
        role: 'model', 
        parts:[{text: "Error from AI Chatbot"}]
      }]);
    }
  };

  return {
    messages,
    register,
    handleSubmit,
    errors,
    messagesEndRef,
    onSubmit
  };
};
