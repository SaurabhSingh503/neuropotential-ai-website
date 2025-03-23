import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'file:\\\C:\Users\KIIT\NeuroPotential\client\src\contexts\AuthContext.jsx';
import { uploadMedicalReport } from 'file:\\\C:\Users\KIIT\NeuroPotential\client\src\services\documentService.js';
import 'file:///C:/Users/KIIT/NeuroPotential/client/src/styles/upload.css';

const UploadDocumentPage = () => {
  const [file, setFile] = useState(null);
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.type === 'application/pdf' || 
          selectedFile.type.startsWith('image/')) {
        setFile(selectedFile);
        setError('');
      } else {
        setFile(null);
        setError('Please upload a PDF or image file');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please select a file to upload');
      return;
    }
    
    if (!patientName.trim()) {
      setError('Please enter the patient name');
      return;
    }
    
    if (!patientAge.trim() || isNaN(patientAge) || parseInt(patientAge) < 1) {
      setError('Please enter a valid age');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      await uploadMedicalReport(
        file, 
        patientName, 
        parseInt(patientAge),
        currentUser.uid,
        (progress) => {
          setUploadProgress(progress);
        }
      );
      
      navigate('/assessment');
    } catch (err) {
      setError('Failed to upload document: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-page">
      <div className="container">
        <div className="upload-container">
          <div className="upload-card">
            <div className="upload-header">
              <h2>Upload Medical Report</h2>
              <p>Please upload a medical document for analysis</p>
            </div>
            
            {error && <div className="alert alert-danger">{error}</div>}
            
            <form onSubmit={handleSubmit} className="upload-form">
              <div className="form-group">
                <label htmlFor="patientName" className="form-label">Patient Name</label>
                <input
                  id="patientName"
                  type="text"
                  className="form-control"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="Full name of the patient"
                  disabled={loading}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="patientAge" className="form-label">Patient Age</label>
                <input
                  id="patientAge"
                  type="number"
                  className="form-control"
                  value={patientAge}
                  onChange={(e) => setPatientAge(e.target.value)}
                  placeholder="Age in years"
                  min="1"
                  max="100"
                  disabled={loading}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="document" className="form-label">Medical Document</label>
                <div className="file-upload-container">
                  <input
                    id="document"
                    type="file"
                    className="file-input"
                    onChange={handleFileChange}
                    accept=".pdf,image/*"
                    disabled={loading}
                    required
                  />
                  <label htmlFor="document" className="file-upload-label">
                    {file ? file.name : 'Click to select a file or drag it here'}
                  </label>
                </div>
                <p className="file-hint">Accepted formats: PDF, JPG, PNG (max 10MB)</p>
              </div>
              
              {loading && (
                <div className="progress-container">
                  <div className="progress-bar" style={{ width: `${uploadProgress}%` }}></div>
                  <span className="progress-text">{uploadProgress}% Uploaded</span>
                </div>
              )}
              
              <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                {loading ? 'Uploading...' : 'Upload Document'}
              </button>
            </form>
            
            <div className="upload-info">
              <h3>Why do we need this document?</h3>
              <p>
                This document will help our AI analyze the specific needs and strengths of the 
                patient. All information is kept strictly confidential and secure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadDocumentPage;
