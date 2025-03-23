import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from 'file:\\\C:\Users\KIIT\NeuroPotential\client\src\contexts\AuthContext.jsx';
import { ChatbotProvider } from 'file:\\\C:\Users\KIIT\NeuroPotential\client\src\contexts\ChatbotContext.jsx';
import PrivateRoute from 'file:\\\C:\Users\KIIT\NeuroPotential\client\src\components\common\PrivateRoute.jsx';
import Header from 'file:\\\C:\Users\KIIT\NeuroPotential\client\src\components\layout\Header.jsx';
import Footer from 'file:\\\C:\Users\KIIT\NeuroPotential\client\src\components\layout\Footer.jsx';
import HomePage from 'file:\\\C:\Users\KIIT\NeuroPotential\client\src\pages\HomePage.jsx';
import LoginPage from 'file:\\\C:\Users\KIIT\NeuroPotential\client\src\pages\LoginPage.jsx';
import RegisterPage from 'file:\\\C:\Users\KIIT\NeuroPotential\client\src\pages\RegisterPage.jsx';
import DashboardPage from 'file:\\\C:\Users\KIIT\NeuroPotential\client\src\pages\DashboardPage.jsx';
import ProfilePage from 'file:\\\C:\Users\KIIT\NeuroPotential\client\src\pages\ProfilePage.jsx';
import UploadDocumentPage from 'file:\\\C:\Users\KIIT\NeuroPotential\client\src\pages\UploadDocumentPage.jsx';
import AssessmentPage from 'file:\\\C:\Users\KIIT\NeuroPotential\client\src\pages\AssessmentPage.jsx';
import RecommendationsPage from 'file:\\\C:\Users\KIIT\NeuroPotential\client\src\pages\RecommendationsPage.jsx';
import AboutPage from 'file:\\\C:\Users\KIIT\NeuroPotential\client\src\pages\AboutPage.jsx';
import HowItWorksPage from 'file:\\\C:\Users\KIIT\NeuroPotential\client\node_modules\resolve-url-loader\docs\how-it-works.md';
import './styles/global.css';
import './styles/basic.css';

function App() {
  return (
    <AuthProvider>
        <ChatbotProvider>
        <Router>
        <div className="app-container">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="/dashboard" element={
                <PrivateRoute>
                  <DashboardPage />
                </PrivateRoute>
              } />
              <Route path="/profile" element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              } />
              <Route path="/upload-document" element={
                <PrivateRoute>
                  <UploadDocumentPage />
                </PrivateRoute>
              } />
              <Route path="/assessment" element={
                <PrivateRoute>
                  <AssessmentPage />
                </PrivateRoute>
              } />
              <Route path="/recommendations" element={
                <PrivateRoute>
                  <RecommendationsPage />
                </PrivateRoute>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
        </ChatbotProvider>
      
    </AuthProvider>
  );
}

export default App;
