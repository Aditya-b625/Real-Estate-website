import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { verifyOtp } from '../../apiRoute'
import './otpverify.css'
import {toast} from "react-toastify";

// function OtpVerify() {
//     const [otp, setOtp] = useState('');
//     const navigate = useNavigate();
  
//     const handleVerify = async () => {
//       const activationToken = localStorage.getItem("activationToken");
  
//       if (!activationToken) {
//         toast("Activation token not found. Please register again.");
//         return;
//       }
  
//       try {
//         const res = await verifyOtp({ otp, activationToken });
//         toast.success(res.data.message,{autoClose:5000});
//         localStorage.removeItem("activationToken");
//         navigate('/signin');
//       } catch (error) {
//         toast.error(error.response?.data?.message || "OTP verification failed");
//       }
//     };
//     return (
//         <>
//             <div className="otp-page">
//                 <div className="d-flex align-items-center justify-content-center vh-100">
//                     <div className="glass-box p-3 rounded text-center">
//                         <h4 className="mb-4 text-primary fw-bold">Enter your OTP here</h4>
//                         <input
//                             type="text"
//                             className="form-control mb-4 text-center fs-5"
//                             maxLength={6}
//                             placeholder="Enter OTP"
//                             inputMode="numeric"
//                             value={otp}
//                             onChange={(e) => setOtp(e.target.value)}
//                         />
//                         <button className="btn btn-primary w-100 mb-3" onClick={handleVerify}>Verify</button>
//                         <a href="/signin" className="text-dark">Go to login page</a>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }
// export default OtpVerify

function OtpVerify(){
  const [otpDigits, setOtpDigits] = useState(Array(6).fill(''));
  const navigate = useNavigate();
  
  const handleVerify = async (e) => {
      e.preventDefault();
      const activationToken = localStorage.getItem('activationToken');
      if (!activationToken) {
          toast.error('No activation token found. Please sign up again.');
          return;
      }

      const otp = otpDigits.join('');

      try {
          const response = await verifyOtp({ otp: Number(otp), activationToken });
          toast.success(response.data.message || 'OTP Verified Successfully!');
          localStorage.removeItem('activationToken');
          setTimeout(() => {
              navigate('/signin');
          }, 3000);
      } catch (err) {
          console.error('OTP verification error:', err);
          toast.error(err.response?.data?.message || 'Invalid OTP. Try again.');
      }
  };

  const handleOtpChange = (e, i) => {
      const val = e.target.value;

      if (/^\d?$/.test(val)) {
          const newOtpDigits = [...otpDigits];
          newOtpDigits[i] = val;
          setOtpDigits(newOtpDigits);

          if (val !== '' && i < 5) {
              const nextInput = document.getElementById(`otp-${i + 1}`);
              nextInput?.focus();
          }
      }
  };

  return (
      <div className="otp-page otp-bg d-flex justify-content-center align-items-center">
          <div className="glass-box otp-card text-center">
              <h4 className="fw-bold mb-2">Verification code</h4>
              <p className="mb-4 text-muted">Enter your 6 digit code sent to your email.</p>

              <form onSubmit={handleVerify}>
                  <div className="otp-boxes mb-4">
                      {otpDigits.map((digit, i) => (
                          <input
                              key={i}
                              id={`otp-${i}`}
                              type="text"
                              inputMode="numeric"
                              maxLength="1"
                              className="otp-box"
                              value={digit}
                              onChange={(e) => handleOtpChange(e, i)}
                          />
                      ))}
                  </div>

                  <button type="submit" className="btn btn-primary w-100 mb-3">
                      Verify
                  </button>
                  <Link to="/signin" className="text-dark">Go to login page</Link>
              </form>
          </div>
      </div>
  );
};

export default OtpVerify;