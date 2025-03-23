import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from 'file:\\\C:\Users\KIIT\NeuroPotential\client\src\contexts\AuthContext.jsx';
import 'file:\\\C:\Users\KIIT\NeuroPotential\client\src\styles\dashboard.css';

const DashboardPage = () => {
  const { currentUser } = useAuth();
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user assessments - in a real app, this would be an API call
    const fetchAssessments = async () => {
      try {
        // Simulating API call with setTimeout
        setTimeout(() => {
          setAssessments([
            {
              id: 1,
              patientName: 'Alex Johnson',
              patientAge: 15,
              status: 'completed',
              progress: 100,
              date: '2023-04-10',
              recommendations: true
            },
            {
              id: 2,
              patientName: 'Sam Williams',
              patientAge: 12,
              status: 'in_progress',
              progress: 45,
              date: '2023-04-15',
              recommendations: false
            }
          ]);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching assessments:', error);
        setLoading(false);
      }
    };

    fetchAssessments();
  }, []);

  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <h2>Welcome, {currentUser?.name || 'User'}</h2>
          <p>Manage your assessments and recommendations</p>
        </div>

        <div className="dashboard-actions">
          <Link to="/upload-document" className="btn btn-primary">
            Start New Assessment
          </Link>
        </div>
        
        <div className="dashboard-section">
          <h3>Your Assessments</h3>
          
          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Loading assessments...</p>
            </div>
          ) : assessments.length > 0 ? (
            <div className="assessments-grid">
              {assessments.map(assessment => (
                <div key={assessment.id} className="assessment-card">
                  <div className="assessment-info">
                    <h4>{assessment.patientName}</h4>
                    <p>Age: {assessment.patientAge}</p>
                    <p>Date: {new Date(assessment.date).toLocaleDateString()}</p>
                    
                    <div className="assessment-status">
                      <span 
                        className={`status-badge ${assessment.status === 'completed' ? 'status-complete' : 'status-progress'}`}
                      >
                        {assessment.status === 'completed' ? 'Completed' : 'In Progress'}
                      </span>
                    </div>
                    
                    {assessment.status === 'in_progress' && (
                      <div className="progress-container">
                        <div 
                          className="progress-bar" 
                          style={{ width: `${assessment.progress}%` }}
                        ></div>
                        <span className="progress-text">{assessment.progress}% Complete</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="assessment-actions">
                    {assessment.status === 'completed' ? (
                      <Link to={`/recommendations?id=${assessment.id}`} className="btn btn-outline">
                        View Recommendations
                      </Link>
                    ) : (
                      <Link to={`/assessment?id=${assessment.id}`} className="btn btn-outline">
                        Continue Assessment
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>You haven't started any assessments yet.</p>
              <Link to="/upload-document" className="btn btn-primary">
                Start Your First Assessment
              </Link>
            </div>
          )}
        </div>
        
        <div className="dashboard-section">
          <h3>Resources</h3>
          <div className="resources-grid">
            <div className="resource-card">
              <h4>Understanding Neurodiversity</h4>
              <p>Learn about different types of neurodiversity and how they affect career choices.</p>
              <a href="/resources/neurodiversity" className="btn btn-outline">Read More</a>
            </div>
            
            <div className="resource-card">
              <h4>Career Planning Guide</h4>
              <p>A step-by-step guide for helping neurodiverse individuals plan their career path.</p>
              <a href="/resources/career-planning" className="btn btn-outline">Read More</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
