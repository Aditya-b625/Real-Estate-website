import React, { useEffect, useState } from 'react'
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa"
import { useForm } from "react-hook-form"
import axios from 'axios'
import {toast} from 'react-toastify'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import './contact.css';

function Contact() {
  const {register,handleSubmit,watch,formState: { errors },reset,} = useForm()

  const onSubmit = async (data) => {
    const userInfo = {
      access_key: process.env.REACT_APP_WEB3FORMS_API_KEY,
      name: data.username,
      email: data.email,
      message: data.message
    }
    try {
      await axios.post("https://api.web3forms.com/submit", userInfo);
      toast.success("Message sent successfully!");
      reset();   // Reset the form fields after success
    } catch (error) {
      toast.error("An error occurred");
    }
  }

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fake loading delay - 2 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Header/>
        <div className='contact'>
            <img src="/images/contact.jpg" style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "cover",
                }} alt="Contact Us" className="" />
            <h6 className="text-center text-muted mb-5 mt-5">We would love to hear from you! Please fill out the form below or contact us directly.</h6>
        </div>

      <div className="container">
        <div className="row justify-content-center mb-3">
          <div className="col-md-8 col-lg-8 mb-5">
            <div className="bg-white p-4 rounded-lg shadow rounded-2 contact-form-box">
              <div className="text-center mb-5">
                <h2 className="">Get in Touch</h2>
              </div>

              {/* Form Section */}
              <div className="row">
                <div className="col-md-6 mb-4 ms-4">
                  <h3 className="h5 text-muted mb-4">Send us a message</h3>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                      <input
                        type="text"
                        name="username"
                        placeholder="Your Name"
                        className="form-control"
                        {...register("username", { required: true })}
                      />
                      {errors.username && (
                        <div className="text-danger">This field is required</div>
                      )}
                    </div>

                    <div className="mb-3">
                      <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        className="form-control"
                        {...register("email", { required: true })}
                      />
                      {errors.email && (
                        <div className="text-danger">This field is required</div>
                      )}
                    </div>

                    <div className="mb-3">
                      <textarea
                        name="message"
                        placeholder="Your Message"
                        className="form-control"
                        rows={3}
                        {...register("message", { required: true })}
                      />
                      {errors.message && (
                        <div className="text-danger">This field is required</div>
                      )}
                    </div>

                    <div className="d-grid gap-2">
                      <button type="submit" className="btn btn-dark btn-lg">
                        Send Message
                      </button>
                    </div>
                  </form>
                </div>

                {/* Contact Information Section */}
                <div className="col-md-4 ms-5 ps-4 mt-4">
                  <h3 className="h5 text-muted mb-4">Contact Information</h3>
                  <ul className="list-unstyled">
                    <li className="d-flex align-items-center mb-3">
                    <i class="fa-solid fa-phone text-danger me-2"></i>
                      <span>+91 7234567896</span>
                    </li>
                    <li className="d-flex align-items-center mb-3">
                      <i class="fa-solid fa-envelope me-2"></i>
                      <span>assetbazar687@gmail.com</span>
                    </li>
                    <li className="d-flex align-items-center">
                      <i class="fa-solid fa-location-dot text-success me-2"></i>
                      <span>Indore, MP, India</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default Contact;
