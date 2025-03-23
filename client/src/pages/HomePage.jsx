import React from 'react';
import { Link } from 'react-router-dom';
import 'file:\\\C:\Users\KIIT\NeuroPotential\client\src\styles\home.css';
import Accordion from 'file:\\\C:\Users\KIIT\NeuroPotential\client\src\components\common\Accordion.jsx';

const HomePage = () => {
  const faqItems = [
    {
      id: 0,
      title: 'What is the Yukti Project',
      content: 'The Yukti Project is created by a team of 4 undergraduate students in Bhubaneswar, India. We provide career guidance for neurodiverse individuals, especially those with autism spectrum disorders, by analyzing medical reports and personal strengths to recommend suitable career paths.'
    },
    {
      id: 1,
      title: 'Who does Yukti Cater To?',
      content: 'Yukti is designed for neurodiverse individuals aged 10-20 years, particularly those with autism spectrum disorders. Our platform helps parents and caregivers identify strengths and potential career paths based on individual abilities and preferences.'
    },
    {
        id: 2, // Changed from 3 to 2
        title: 'What do I need to do to use Yukti?',
        content: 'To use Yukti, simply create an account, upload your medical documentation...'
      }
    
    ];

  return (
    <div className="home-page">
      <section className="hero">
        <div className="container hero-container">
          <div className="hero-content">
            <h1>Yukti - Health Is Wealth</h1>
            <p className="hero-subtitle">We help you with the autism spectrum</p>
            <Link to="/register" className="btn btn-primary">Get Started</Link>
          </div>
        </div>
      </section>

      <section className="faq-section">
        <div className="container">
          <Accordion items={faqItems} />
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <img src="/assets/fast-icon.svg" alt="Fast icon" />
              </div>
              <h3>Fast</h3>
              <p>You've never made a website this fast before. Get results in minutes with our streamlined process.</p>
              <Link to="/how-it-works" className="btn btn-outline">Read More</Link>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <img src="/assets/easy-icon.svg" alt="Easy icon" />
              </div>
              <h3>Easy</h3>
              <p>Works like the canvas tools you're familiar with. Our user-friendly interface makes it simple to get started.</p>
              <Link to="/how-it-works" className="btn btn-outline">Read More</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Sign up today.</h2>
          <p>Join our community and discover career paths suited to your unique abilities.</p>
          <Link to="/register" className="btn btn-primary">Get Started</Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
