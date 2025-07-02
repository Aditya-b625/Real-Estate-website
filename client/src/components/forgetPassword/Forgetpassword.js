import React,{ useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { forgotPassword } from '../../apiRoute';
import {toast} from 'react-toastify';
import './forgetpassword.css';

function Forgetpassword(){
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
  
    // Handle email input change
    const handleChange = (e) => {
      setEmail(e.target.value);
    };
  
    // Form submit handler
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError('');
      setSuccessMessage('');
  
      // Simple email validation
      if (!email) {
        setError('Email is required.');
        setLoading(false);
        return;
      }
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailRegex.test(email)) {
        setError('Invalid email format.');
        setLoading(false);
        return;
      }
  
      try {
        const response = await forgotPassword({ email });
        setSuccessMessage('Password reset OTP has been sent to your email.');
        // toast.success('Password reset link has been sent to your email.');
        setTimeout(() => {
            navigate("/resetpasswordotp");
        }, 2000);
      } catch (error) {
        console.log(error)
        setError(error.response?.data?.message || 'An error occurred while sending the reset link.');
        // toast.error(error.response?.data?.message || 'An error occurred while sending the reset link.');
      } finally {
        setLoading(false);
      }
    };
    return (
        <>
      <div className="forget-page d-flex justify-content-center align-items-center 100vh" >
        <div className="glass-box  p-4 rounded" style={{ width: '100%', maxWidth: '500px' }}>
          <h3 className="text-center mb-4">Forget Password</h3>
          <p className="text-center text-muted mb-4">Enter your email address to receive a password reset link.</p>

          {/* Success/Failure Message */}
          {successMessage && <div className="alert alert-success">{successMessage}</div>}
          {/* {error && <div className="alert alert-danger">{error}</div>} */}

          {/* Forgot Password Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                className={`form-control ${error ? 'is-invalid' : ''}`}
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleChange}
              />
              {error && <div className="invalid-feedback">{error}</div>}
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? (
                  <div className="spinner-border spinner-border-sm" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  'Send Reset OTP'
                )}
              </button>
            </div>
            <Link to='/signin'>Back to login</Link>
          </form>
        </div>
      </div>  
        </>
    )
}

export default Forgetpassword
