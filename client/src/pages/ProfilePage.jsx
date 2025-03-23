import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from 'file:\\\C:\Users\KIIT\NeuroPotential\client\src\contexts\AuthContext.jsx';
import 'file:\\\C:\Users\KIIT\NeuroPotential\client\src\styles\profile.css';

const ProfilePage = () => {
  const { currentUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const formik = useFormik({
    initialValues: {
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      phone: currentUser?.phone || '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      phone: Yup.string().matches(/^[0-9]{10}$/, 'Phone number must be 10 digits').required('Phone number is required'),
    }),
    onSubmit: async (values) => {
      try {
        // In a real app, this would be an API call to update the user profile
        console.log('Updating profile with values:', values);
        
        // Simulating an API call with setTimeout
        setTimeout(() => {
          setMessage({ 
            type: 'success', 
            text: 'Profile updated successfully!' 
          });
          setEditing(false);
        }, 1000);
      } catch (error) {
        setMessage({ 
          type: 'error', 
          text: 'Failed to update profile: ' + error.message 
        });
      }
    },
  });

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-header">
          <h2>Your Profile</h2>
          <p>Manage your personal information</p>
        </div>
        
        <div className="profile-container">
          <div className="profile-card">
            {message.text && (
              <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-danger'}`}>
                {message.text}
              </div>
            )}
            
            <form onSubmit={formik.handleSubmit} className="profile-form">
              <div className="form-group">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  disabled={!editing}
                />
                {editing && formik.touched.name && formik.errors.name ? (
                  <div className="form-error">{formik.errors.name}</div>
                ) : null}
              </div>
              
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  disabled={!editing}
                />
                {editing && formik.touched.email && formik.errors.email ? (
                  <div className="form-error">{formik.errors.email}</div>
                ) : null}
              </div>
              
              <div className="form-group">
                <label htmlFor="phone" className="form-label">Phone Number</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                  disabled={!editing}
                />
                {editing && formik.touched.phone && formik.errors.phone ? (
                  <div className="form-error">{formik.errors.phone}</div>
                ) : null}
              </div>
              
              <div className="profile-actions">
                {editing ? (
                  <>
                    <button type="submit" className="btn btn-primary">
                      Save Changes
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-outline" 
                      onClick={() => setEditing(false)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button 
                    type="button" 
                    className="btn btn-outline" 
                    onClick={() => setEditing(true)}
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </form>
          </div>
          
          <div className="profile-card">
            <h3>Security Settings</h3>
            
            <div className="security-option">
              <div className="security-option-info">
                <h4>Change Password</h4>
                <p>Update your password to keep your account secure</p>
              </div>
              <button className="btn btn-outline btn-sm">
                Change Password
              </button>
            </div>
            
            <div className="security-option">
              <div className="security-option-info">
                <h4>Two-Factor Authentication</h4>
                <p>Add an extra layer of security to your account</p>
              </div>
              <button className="btn btn-outline btn-sm">
                Enable
              </button>
            </div>
            
            <div className="security-option">
              <div className="security-option-info">
                <h4>Login Activity</h4>
                <p>Review your recent login sessions</p>
              </div>
              <button className="btn btn-outline btn-sm">
                View Activity
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
