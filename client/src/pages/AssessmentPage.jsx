import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChatbot } from 'file:\\\C:\Users\KIIT\NeuroPotential\client\src\contexts\ChatbotContext.jsx';
import 'file:\\\C:\Users\KIIT\NeuroPotential\client\src\styles\assessment.css';

const AssessmentPage = () => {
  const [message, setMessage] = useState('');
  const [isAssessing, setIsAssessing] = useState(false);
  const { messages, sendMessage, startAssessment, isLoading, progress } = useChatbot();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Start the assessment process if not already started
    if (messages.length === 0 && !isAssessing) {
      setIsAssessing(true);
      startAssessment().finally(() => setIsAssessing(false));
    }
  }, [messages.length, startAssessment, isAssessing]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      sendMessage(message);
      setMessage('');
    }
  };

  const handleComplete = () => {
    navigate('/recommendations');
  };

  return (
    <div className="assessment-page">
      <div className="container">
        <div className="assessment-container">
          <div className="assessment-header">
            <h2>AI Assessment</h2>
            <p>Our AI will ask questions to better understand your strengths and challenges</p>
            
            {progress > 0 && (
              <div className="assessment-progress">
                <div className="progress-container">
                  <div 
                    className="progress-bar" 
                    style={{ width: `${progress}%` }}
                    aria-valuenow={progress} 
                    aria-valuemin="0" 
                    aria-valuemax="100"
                  ></div>
                </div>
                <span className="progress-text">{Math.round(progress)}% Complete</span>
              </div>
            )}
          </div>
          
          <div className="chat-container">
            <div className="messages-container">
              {messages.length === 0 && isAssessing ? (
                <div className="loading-message">
                  <div className="spinner"></div>
                  <p>Starting assessment...</p>
                </div>
              ) : (
                messages.map((msg, index) => (
                  <div 
                    key={index} 
                    className={`message ${msg.sender === 'ai' ? 'ai-message' : 'user-message'}`}
                  >
                    <div className="message-content">
                      {msg.text}
                    </div>
                    <div className="message-time">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>
            
            <form onSubmit={handleSendMessage} className="message-form">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your response here..."
                disabled={isLoading}
                className="message-input"
              />
              <button 
                type="submit" 
                className="btn btn-primary send-button"
                disabled={isLoading || !message.trim()}
              >
                Send
              </button>
            </form>
          </div>
          
          {progress >= 100 && (
            <div className="assessment-complete">
              <p>Assessment complete! You can now view your personalized recommendations.</p>
              <button onClick={handleComplete} className="btn btn-primary">
                View Recommendations
              </button>
            </div>
          )}
          
          <div className="assessment-info">
            <h3>How This Works</h3>
            <p>
              Our AI assistant asks a series of questions based on your uploaded documentation 
              and your responses. The more detailed your answers, the better we can understand 
              your unique abilities and challenges.
            </p>
            <p>
              All information is kept confidential and is used solely to generate personalized 
              career recommendations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentPage;
