import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from 'file:\\\C:\Users\KIIT\NeuroPotential\client\src\contexts\AuthContext.jsx';
import 'file:\\\C:\Users\KIIT\NeuroPotential\client\src\styles\auth.css';

const LoginPage = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        setError('');
        setLoading(true);
        await login(values.email, values.password);
        navigate('/dashboard');
      } catch (err) {
        setError('Failed to sign in: ' + (err.message || 'Please check your credentials'));
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="auth-page">
      <div className="container">
        <div className="auth-container">
          <div className="auth-card">
            <div className="auth-header">
              <h2>Welcome Back</h2>
              <p>Sign in to continue your journey</p>
            </div>
            
            {error && <div className="alert alert-danger">{error}</div>}
            
            <form onSubmit={formik.handleSubmit} className="auth-form">
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
                  placeholder="youremail@example.com"
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="form-error">{formik.errors.email}</div>
                ) : null}
              </div>
              
              <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  placeholder="Your password"
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="form-error">{formik.errors.password}</div>
                ) : null}
              </div>
              
              <div className="form-group form-check">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  className="form-check-input"
                  onChange={formik.handleChange}
                  checked={formik.values.rememberMe}
                />
                <label htmlFor="rememberMe" className="form-check-label">Remember me</label>
                <Link to="/forgot-password" className="forgot-password">Forgot Password?</Link>
              </div>
              
              <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>
            
            <div className="auth-footer">
              <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
