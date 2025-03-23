import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { chatbotService } from 'file:\\\C:\Users\KIIT\NeuroPotential\server\src\ai\chatbot\chatbotService.js';
import { ChatbotProvider } from 'file:\\\C:\Users\KIIT\NeuroPotential\client\src\contexts\ChatbotContext.jsx';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChatbotProvider>
      <App />
    </ChatbotProvider>
  </React.StrictMode>
);
