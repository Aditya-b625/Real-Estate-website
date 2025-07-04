import React,{ useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';
import { login } from '../../apiRoute';
import {toast} from "react-toastify";
import './signin.css';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import {Button} from 'react-bootstrap';


function SignIn(){
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [googleBtnLoading, setGoogleBtnLoading] = useState(false);

  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const response = await login({ email, password });
      console.log(response.data); // Log the response data for debugging
      const token = response.data.token;

      if (token) {
        sessionStorage.setItem('token', token);
        // sessionStorage.setItem('userid',response.data.existingUser._id);
        sessionStorage.setItem('user', JSON.stringify(response.data.existingUser));
        navigate('/'); // redirect after login
      }
    } catch (error) {
      toast.error(error.response.data.message);
      //alert('Invalid credentials');
    }finally {
      setLoading(false);
    }
  };
  const handleGoogleLogin = async () => {
    setGoogleBtnLoading(true); // Start loading
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const idToken = await user.getIdToken();

      const res = await fetch("https://real-estate-backend-q59x.onrender.com/auth/user/google-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: idToken }),
      });

      const data = await res.json();
      const userData = data.user;

      if (res.ok) {
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("user", JSON.stringify(userData));
        //setUser(data.user);
        console.log("Google login successful:", data);
        // setIsAuth(true);
        navigate("/");
      } else {
        console.error("Login failed:", data.message);
        toast.error("Login failed: " + data.message);
      }
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Google login failed");
    } finally {
      setGoogleBtnLoading(false);
    }
  };
    return (
        <>
        {/* Loading spinner overlay */}
        {loading && (
          <div className="loading-overlay">
            <div className="spinner"></div>
          </div>
        )}

             {/* Background section */}
      <div className="signin-section d-flex align-items-center justify-content-center">
        <div className="signin-box p-4 rounded shadow-lg">
          
          <h3 className="text-center text-primary fw-bold mb-4">Sign In</h3>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" placeholder='enter email' autofocus  required className="form-control border-bottom" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="mb-2">
              <label className="form-label">Password</label>
              <input type="password" placeholder='enter password' required className="form-control border-bottom" value={password} onChange={(e) => setPassword(e.target.value)} />
              <Link to='/forgetpassword' className="mt-1 ms-1">Forget your password</Link>
            </div>
            {/* <div className="mb-1">
            <Link className='ms-1' to='/' element={<Home/>}>Go to home</Link>
            </div> */}
            <div className="d-flex justify-content-center mb-1 mt-4">
            <button type="submit" className="btn btn-primary w-100">Sign In</button>
            </div>
            <b className='d-flex justify-content-center mb-1'>OR</b>
              <div className="d-flex justify-content-center mb-2">
                <Button
                  type="button"
                  className="btn btn-secondary btn-sm d-flex justify-content-center rounded-2 gap-2"
                  onClick={handleGoogleLogin}
                  disabled={googleBtnLoading}
                >
                  <img
                    src="https://developers.google.com/identity/images/g-logo.png"
                    alt="google"
                    style={{ width: 20, height: 20 }}
                  />
                  {googleBtnLoading ? "Please wait..." : "Sign in with Google"}
                </Button>
              </div>
            <div className="text-center mt-3">
              <p className="mb-1">Don’t have an account? <Link to="/register" className="text-decoration-none">Register</Link></p>
            </div>
          </form>
        </div>
      </div>
        </>
    )
}

export default SignIn;