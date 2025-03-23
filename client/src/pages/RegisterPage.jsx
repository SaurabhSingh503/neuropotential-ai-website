import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from 'file:\\\C:\Users\KIIT\NeuroPotential\client\src\contexts\AuthContext.jsx';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import 'file:\\\C:\Users\KIIT\NeuroPotential\client\src\styles\auth.css';

const RegisterPage = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      phone: Yup.string().matches(/^[0-9]{10}$/, 'Phone number must be 10 digits').required('Phone number is required'),
      password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Please confirm your password'),
    }),
    onSubmit: async (values) => {
      try {
        setError('');
        setLoading(true);
        await signup(values.email, values.password, values.name, values.phone);
        navigate('/dashboard');
      } catch (err) {
        setError('Failed to create an account: ' + err.message);
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
              <h2>Create Account</h2>
              <p>Join Yukti to discover career paths suited to your unique abilities</p>
            </div>
            
            {error && <div className="alert alert-danger">{error}</div>}
            
            <form onSubmit={formik.handleSubmit} className="auth-form">
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
                  placeholder="Your full name"
                  aria-required="true"
                />
                {formik.touched.name && formik.errors.name ? (
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
                  placeholder="youremail@example.com"
                  aria-required="true"
                />
                {formik.touched.email && formik.errors.email ? (
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
                  placeholder="10-digit phone number"
                  aria-required="true"
                />
                {formik.touched.phone && formik.errors.phone ? (
                  <div className="form-error">{formik.errors.phone}</div>
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
                  placeholder="Minimum 8 characters"
                  aria-required="true"
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="form-error">{formik.errors.password}</div>
                ) : null}
              </div>
              
              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                  placeholder="Confirm your password"
                  aria-required="true"
                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                  <div className="form-error">{formik.errors.confirmPassword}</div>
                ) : null}
              </div>
              
              <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                {loading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </form>
            
            <div className="auth-footer">
              <p>Already have an account? <Link to="/login">Log In</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
