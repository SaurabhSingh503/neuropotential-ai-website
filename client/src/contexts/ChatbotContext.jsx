import React, { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';

// Create the context
const ChatbotContext = createContext();

// Hook for using the chatbot context
export const useChatbot = () => {
  return useContext(ChatbotContext);
};

// Provider component
export const ChatbotProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [assessmentId, setAssessmentId] = useState(null);
  const [progress, setProgress] = useState(0);

  // Initialize a new assessment session
  const startAssessment = useCallback(async () => {
    try {
      setIsLoading(true);
      setError('');
      
      // In a real implementation, this would be an API call to your backend
      // For now, we'll simulate the response
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate initial message from AI
      const initialMessage = {
        sender: 'ai',
        text: "Hello! I'm here to help you discover potential career paths based on strengths and interests. First, could you tell me what activities you or your child enjoy the most?",
        timestamp: new Date().toISOString()
      };
      
      setMessages([initialMessage]);
      setAssessmentId('assessment_' + Date.now());
      setProgress(5); // Start with 5% progress
      
      return true;
    } catch (err) {
      setError('Failed to start assessment: ' + (err.message || 'Unknown error'));
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Send a message to the chatbot
  const sendMessage = useCallback(async (messageText) => {
    if (!messageText.trim()) return;
    
    try {
      setIsLoading(true);
      
      // Add user message to the list
      const userMessage = {
        sender: 'user',
        text: messageText,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prevMessages => [...prevMessages, userMessage]);
      
      // In a real implementation, send the message to your AI backend
      // For now, we'll simulate the response
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
      
      // Prepare some sample responses based on user input
      const sampleResponses = [
        "That's really interesting! It sounds like there's a strong interest in patterns and systems. Could you tell me more about how this interest manifests in daily activities?",
        "I notice a preference for structured activities. How does this person respond to changes in routine or unexpected events?",
        "What kinds of environments seem to be most comfortable and productive?",
        "Are there any particular subjects or topics that generate the most excitement or focus?",
        "How would you describe communication style and preferences?",
        "Tell me about any sensory preferences or sensitivities that might be important to consider."
      ];
      
      // Select a random response
      const responseIndex = Math.floor(Math.random() * sampleResponses.length);
      
      // Create AI response
      const aiResponse = {
        sender: 'ai',
        text: sampleResponses[responseIndex],
        timestamp: new Date().toISOString()
      };
      
      // Add AI message to the list
      setMessages(prevMessages => [...prevMessages, aiResponse]);
      
      // Update progress (in a real implementation, this would come from the backend)
      // Here we're just simulating progress increases
      setProgress(prev => {
        const newProgress = Math.min(100, prev + Math.floor(5 + Math.random() * 10));
        return newProgress;
      });
      
      return true;
    } catch (err) {
      setError('Failed to send message: ' + (err.message || 'Unknown error'));
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Reset the conversation
  const resetConversation = useCallback(() => {
    setMessages([]);
    setAssessmentId(null);
    setProgress(0);
    setError('');
  }, []);

  // Value object to be provided by the context
  const value = {
    messages,
    isLoading,
    error,
    progress,
    assessmentId,
    startAssessment,
    sendMessage,
    resetConversation
  };

  return (
    <ChatbotContext.Provider value={value}>
      {children}
    </ChatbotContext.Provider>
  );
};
