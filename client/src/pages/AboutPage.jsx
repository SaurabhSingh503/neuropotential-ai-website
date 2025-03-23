import React from 'react';
import { Link } from 'react-router-dom';
import 'C:\Users\KIIT\NeuroPotential\client\src\styles\about.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="container">
        <div className="about-header">
          <h2>About NeuroPotential</h2>
          <p>Our mission, story, and the team behind the platform</p>
        </div>
        
        <div className="about-section">
          <h3>Our Mission</h3>
          <p>
            At NeuroPotential, we believe that neurodiversity is a valuable form of human 
            diversity. Our mission is to help neurodiverse individuals, particularly those 
            with autism spectrum disorders, discover and pursue careers that leverage their 
            unique abilities and strengths.
          </p>
          <p>
            We're committed to creating a world where neurodiversity is recognized and valued 
            in the workplace, and where career paths are accessible to everyone regardless of 
            how their brains are wired.
          </p>
        </div>
        
        <div className="about-section">
          <h3>Our Story</h3>
          <p>
            NeuroPotential was born out of a hackathon organized by Google Developer Groups (GDG). 
            Our founding team recognized that while there are many resources for diagnosing and 
            treating autism spectrum disorders, there was a significant gap in services helping 
            neurodiverse youth transition into fulfilling careers.
          </p>
          <p>
            By combining expertise in technology, psychology, and education, we created a platform 
            that uses AI to analyze individual strengths and challenges, generating personalized 
            career recommendations that align with each person's unique neurocognitive profile.
          </p>
        </div>
        
        <div className="about-section">
          <h3>Our Approach</h3>
          <div className="approach-grid">
            <div className="approach-card">
              <div className="approach-icon">
                <i className="fas fa-brain"></i>
              </div>
              <h4>Strengths-Based</h4>
              <p>
                We focus on identifying and leveraging strengths rather than remediating 
                deficits. Our AI analyzes patterns of abilities to match individuals with 
                careers where their unique cognitive style is an advantage.
              </p>
            </div>
            
            <div className="approach-card">
              <div className="approach-icon">
                <i className="fas fa-universal-access"></i>
              </div>
              <h4>Accessibility-First</h4>
              <p>
                Our platform is designed with accessibility as a core principle, not an 
                afterthought. We prioritize clear language, predictable navigation, and 
                sensory-friendly design throughout the user experience.
              </p>
            </div>
            
            <div className="approach-card">
              <div className="approach-icon">
                <i className="fas fa-robot"></i>
              </div>
              <h4>AI-Enhanced</h4>
              <p>
                We use advanced artificial intelligence to process complex data from 
                medical reports and interactive assessments, identifying patterns that 
                might be missed through traditional career counseling methods.
              </p>
            </div>
          </div>
        </div>
        
        <div className="about-section">
          <h3>Meet the Team</h3>
          <div className="team-grid">
            <div className="team-member">
              <div className="team-photo" style={{ backgroundImage: 'url(/assets/team-member-1.jpg)' }}></div>
              <h4>Aarav Sharma</h4>
              <p className="team-role">Founder & CEO</p>
              <p className="team-bio">
                Computer Science graduate with a personal connection to neurodiversity 
                through his brother's journey with autism.
              </p>
            </div>
            
            <div className="team-member">
              <div className="team-photo" style={{ backgroundImage: 'url(/assets/team-member-2.jpg)' }}></div>
              <h4>Priya Patel</h4>
              <p className="team-role">Lead Developer</p>
              <p className="team-bio">
                Full-stack developer with expertise in accessible web applications 
                and AI integration.
              </p>
            </div>
            
            <div className="team-member">
              <div className="team-photo" style={{ backgroundImage: 'url(/assets/team-member-3.jpg)' }}></div>
              <h4>Rohan Gupta</h4>
              <p className="team-role">AI Research Specialist</p>
              <p className="team-bio">
                Machine learning expert focused on natural language processing and 
                document analysis.
              </p>
            </div>
            
            <div className="team-member">
              <div className="team-photo" style={{ backgroundImage: 'url(/assets/team-member-4.jpg)' }}></div>
              <h4>Ananya Singh</h4>
              <p className="team-role">Clinical Advisor</p>
              <p className="team-bio">
                Licensed psychologist specializing in neurodevelopmental disorders and 
                vocational rehabilitation.
              </p>
            </div>
          </div>
        </div>
        
        <div className="about-cta">
          <h3>Join Our Mission</h3>
          <p>
            We're always looking for partners, advisors, and collaborators who share our 
            vision of a more inclusive workforce that values neurodiversity as a competitive advantage.
          </p>
          <Link to="/contact" className="btn btn-primary">Get Involved</Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
