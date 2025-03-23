import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import 'file:\\\C:\Users\KIIT\NeuroPotential\client\src\styles\recommendations.css';

const RecommendationsPage = () => {
  const [searchParams] = useSearchParams();
  const assessmentId = searchParams.get('id');
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // In a real app, fetch recommendations from the API
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        // Simulating API call with setTimeout
        setTimeout(() => {
          setRecommendations({
            patientName: 'Alex Johnson',
            patientAge: 15,
            assessmentDate: '2023-04-10',
            summary: 'Based on the assessment, Alex shows strong analytical thinking, pattern recognition, and attention to detail. Alex performs well in structured environments and shows particular interest in technology and systems.',
            careers: [
              {
                title: 'Software Developer',
                match: 95,
                strengths: 'Strong pattern recognition, logical thinking, and attention to detail make software development an excellent career path. Alex\'s ability to focus deeply on subjects of interest aligns well with coding tasks.',
                challenges: 'May find open office environments or highly social workplaces challenging. Remote work or quiet workspace accommodations would be beneficial.',
                education: 'Computer Science degree or coding bootcamp. Many resources for self-taught learning are available online.',
                resources: ['Code.org', 'Khan Academy Computer Science', 'freeCodeCamp']
              },
              {
                title: 'Data Analyst',
                match: 90,
                strengths: 'Excellent pattern recognition and detail orientation are valuable in data analysis. Alex\'s systematic thinking would be an asset when working with complex datasets.',
                challenges: 'May need clear project parameters and structured workflows. Written communication might be preferred over verbal presentations.',
                education: 'Statistics, Mathematics, or Computer Science degree. Many certificate programs are also available.',
                resources: ['Datacamp', 'Kaggle Learn', 'MIT OpenCourseWare Statistics']
              },
              {
                title: 'Quality Assurance Specialist',
                match: 85,
                strengths: 'Strong attention to detail and ability to spot inconsistencies make this an excellent match. Structured testing environments align well with Alex\'s preferences.',
                challenges: 'May need clear testing procedures and documentation. Regular schedule and predictable workflows would be beneficial.',
                education: 'Computer Science or related field. ISTQB certification can be valuable.',
                resources: ['Ministry of Testing', 'ISTQB Study Materials', 'TestLodge Blog']
              }
            ]
          });
          setLoading(false);
        }, 1500);
      } catch (err) {
        setError('Failed to load recommendations. Please try again later.');
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [assessmentId]);

  if (loading) {
    return (
      <div className="recommendations-page">
        <div className="container">
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading recommendations...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="recommendations-page">
        <div className="container">
          <div className="error-container">
            <h2>Error</h2>
            <p>{error}</p>
            <Link to="/dashboard" className="btn btn-primary">
              Return to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="recommendations-page">
      <div className="container">
        <div className="recommendations-header">
          <h2>Career Recommendations</h2>
          <p>Based on assessment for {recommendations?.patientName}</p>
        </div>
        
        <div className="recommendations-container">
          <div className="recommendations-summary">
            <h3>Assessment Summary</h3>
            <p>{recommendations?.summary}</p>
            <div className="summary-details">
              <div className="summary-item">
                <span className="summary-label">Patient:</span>
                <span className="summary-value">{recommendations?.patientName}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Age:</span>
                <span className="summary-value">{recommendations?.patientAge} years</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Assessment Date:</span>
                <span className="summary-value">
                  {recommendations?.assessmentDate ? new Date(recommendations.assessmentDate).toLocaleDateString() : ''}
                </span>
              </div>
            </div>
          </div>
          
          <div className="career-recommendations">
            <h3>Recommended Career Paths</h3>
            
            {recommendations?.careers && recommendations.careers.map((career, index) => (
              <div key={index} className="career-card">
                <div className="career-header">
                  <h4>{career.title}</h4>
                  <div className="match-score">
                    <span className="match-label">Match</span>
                    <span className="match-value">{career.match}%</span>
                  </div>
                </div>
                
                <div className="career-details">
                  <div className="career-section">
                    <h5>Why It's a Good Match</h5>
                    <p>{career.strengths}</p>
                  </div>
                  
                  <div className="career-section">
                    <h5>Potential Challenges & Accommodations</h5>
                    <p>{typeof career.challenges === 'string' ? career.challenges : 'Information not available'}</p>
                  </div>
                  
                  <div className="career-section">
                    <h5>Education & Training Path</h5>
                    <p>{career.education}</p>
                  </div>
                  
                  <div className="career-section">
                    <h5>Helpful Resources</h5>
                    <ul className="resource-list">
                      {career.resources && career.resources.map((resource, i) => (
                        <li key={i}>{resource}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="recommendations-actions">
            <Link to="/dashboard" className="btn btn-outline">
              Back to Dashboard
            </Link>
            <button className="btn btn-primary">
              Download PDF Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationsPage;
