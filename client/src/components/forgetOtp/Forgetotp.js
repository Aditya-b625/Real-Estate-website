import React, { useState }  from 'react'
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import { resetPassword } from '../../apiRoute';

function Forgetotp(){
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      email: '',
      otp: '',
      newPassword: '',
    });
  
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
      if (error) setError('');
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError('');
  
      const { email, otp, newPassword } = formData;
  
      // Basic validations
      if (!email || !otp || !newPassword) {
        setError('All fields are required.');
        setLoading(false);
        return;
      }
  
      if (newPassword.length < 6) {
        setError('Password must be at least 6 characters.');
        setLoading(false);
        return;
      }
  
      try {
        const response = await resetPassword({ email, otp, newPassword });
        toast.success('Password reset successfully!');
        setTimeout(() => {
          navigate('/signin');
        }, 2000);
      } catch (err) {
        console.error(err);
        const apiError = err.response?.data?.message || 'Failed to reset password.';
        setError(apiError);
        toast.error(apiError);
      } finally {
        setLoading(false);
      }
    };
    return (
        <>
            <div className="otp-page d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <div className="glass-box  p-4 rounded" style={{ width: '100%', maxWidth: '400px' }}>
                    <h4 className="text-center mb-3">Reset Password</h4>
                    <p className="text-center text-muted mb-4">Enter the OTP sent to your email along with your new password.</p>

                    {error && <div className="alert alert-danger">{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                disabled={loading}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">OTP</label>
                            <input
                                type="text"
                                name="otp"
                                className="form-control"
                                value={formData.otp}
                                onChange={handleChange}
                                placeholder="Enter OTP"
                                disabled={loading}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">New Password</label>
                            <div className="input-group">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="newPassword"
                                    className="form-control"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                    placeholder="Enter new password"
                                    disabled={loading}
                                />
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() => setShowPassword(!showPassword)}
                                    tabIndex={-1}
                                >
                                    {showPassword ? 'Hide' : 'Show'}
                                </button>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-success w-100" disabled={loading}>
                            {loading ? (
                                <div className="spinner-border spinner-border-sm" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            ) : (
                                'Reset Password'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Forgetotp
