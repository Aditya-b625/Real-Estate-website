import React from 'react'
import Header from '../header/Header';
import './about.css'

function About(){
    return (
        <>
          <Header/>
          {/* <div className="container mt-3">
          <h3>About Us</h3>
          <hr/>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae delectus facilis natus sunt quidem omnis in debitis nemo quis alias temporibus repudiandae, similique labore quibusdam veniam unde odio expedita quam fugit tempora nostrum illo sint! Porro et, nihil nemo assumenda blanditiis eveniet! Atque, neque sed aliquam accusamus cumque iusto quibusdam eum natus libero voluptatibus asperiores rem animi alias, quae enim rerum fugit reprehenderit delectus impedit recusandae. Ut quisquam explicabo itaque in sed alias fuga quos natus unde id nulla rerum est doloremque deleniti ipsam, et illum inventore non aperiam. Illo ex quibusdam quo nemo vitae distinctio. A exercitationem consequatur ut!</p>
         </div> */}
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold text-dark">About Us - Asset Bazar</h1>
        <p className="lead fst-italic">Your Gateway to Dream Properties</p>
      </div>

      <div className="row mb-4">
        <div className="col-md-12">
          <p>
            At <strong>Asset Bazar</strong>, we believe that every property has a story, and every buyer deserves a perfect match. Whether you're buying your first home, upgrading, investing, or looking for a rental, we're here to guide you every step of the way.
          </p>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-6">
          <h3>Who We Are</h3>
          <p>
            Asset Bazar is a tech-driven real estate platform that brings together buyers, sellers, renters, and agents under one roof. Founded with a vision to simplify property transactions, we blend local market expertise with powerful digital tools to make your property journey smooth and successful.
          </p>
        </div>
        <div className='col-md-6 text-start px-5'>
            <img src='/images/pexels-binyaminmellish-186077.jpg'
              height={300}
            ></img>
        </div>
        <div className='col-md-6 py-4'>
            <img src='/images/estate3.jpg' height={300}>
            </img>
        </div>
        <div className="col-md-6 mt-4 px-5 py-4">
          <h3 className='px-4'>What We Do</h3>
          <ul>
            <li>Property Listings – Thousands of verified properties</li>
            <li>Smart Search Filters – Find your perfect match easily</li>
            <li>Virtual Tours & Photos – Explore homes online</li>
            <li>Legal & Loan Assistance – Trusted support partners</li>
            <li>Expert Guidance – Real agents with real help</li>
          </ul>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-12">
          <h3>Why Choose Us</h3>
          <ul className="list-inline">
            <li className="list-inline-item me-4">✔ Verified Listings</li>
            <li className="list-inline-item me-4">✔ Transparent Pricing</li>
            <li className="list-inline-item me-4">✔ End-to-End Support</li>
            <li className="list-inline-item me-4">✔ Trusted by Thousands</li>
          </ul>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-12">
          <h3>Our Mission</h3>
          <p>To make property buying, selling, and renting simpler, smarter, and safer for everyone.</p>
        </div>
      </div>

      <div className="row text-center">
        <div className="col-md-12">
          <h4>Contact Us</h4>
          <p>Have questions? Our team is here for you anytime.</p>
          <button className="btn btn-primary">Get In Touch</button>
        </div>
      </div>
    </div>

        </>
    )
}

export default About;

