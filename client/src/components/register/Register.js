import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { signup } from '../../apiRoute'
import axiosInstance from '../../util/axios';
import './register.css'
import {toast} from "react-toastify";
import { Button } from 'react-bootstrap';


function Register(){
  const [loading, setLoading] = useState(false);
  const [googleBtnLoading, setGoogleBtnLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    password: "",
    profileImage: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profileImage") {
      setFormData({ ...formData, [name]: files[0] });
      //console.log(files,e.target.files[0].name);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  //console.log(formData);

  const handleSignup = async (e) => {
    setLoading(true);
    e.preventDefault();
    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }

    //Debugging
    for (let pair of data.entries()) {
      console.log(pair[0] + ':', pair[1]);
    }

    try {
      const res = await axiosInstance.post('/auth/register', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      //Save token to use in OTP verify step
      localStorage.setItem("activationToken", res.data.activationToken);
      toast.success(res.data.message);
      
      //Navigate to OTP verify page
      setTimeout(() => {
        navigate("/verify");
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Registration failed");
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
      setGoogleBtnLoading(false); // Stop loading
    }
  };

    return (
        <>
        <div className="register-page">
    
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="glass-box p-4 rounded">
          <h3 className="text-center text-primary fw-bold mb-3">Register</h3>
          <form onSubmit={handleSignup}>
            <div className="form-group mb-3">
              <input type="text" required className="form-control" autofocus='autofocus' placeholder="Let Me Know Your Name"  name='name' onChange={handleChange}/>
            </div>
            <div className="form-group mb-3">
              <input type="email" required className="form-control" placeholder="Email" name="email" onChange={handleChange}/>
            </div>
            <div className="form-group mb-3">
              <input required inputMode='numeric' maxlength={10} minLength={10} className="form-control" placeholder="Contact" name='contact'  onChange={handleChange}/>
            </div>
            <div className="form-group mb-3">
              <input type="password" required className="form-control" placeholder="Password" name='password' onChange={handleChange}/>
            </div>
            <div className="form-group mb-4">
              <label className="form-label">Profile Image</label>
              <input type="file" className="form-control" name='profileImage' onChange={handleChange}/>
            </div>
            <button type="submit" className="btn btn-primary w-100 d-flex justify-content-center mb-1">
            {loading && (
        <div className="text-center ">
          <div className="spinner-border me-2 spinner-border-sm" role="status" />
        </div>
      )}
              Request OTP</button>
              <b className='d-flex justify-content-center'>OR</b>
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
                  {googleBtnLoading ? "Please wait..." : "Sign up with Google"}
                </Button>
              </div>
            <p className="text-center mt-3">Already have an account? <Link to="/signin">Sign in</Link></p>
          </form>
        </div>
      </div>
    </div>
        </>
    )
}

 export default Register;
