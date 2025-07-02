import React from 'react'
import Header from '../header/Header';
import './about.css'
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaQuoteRight, FaStar } from "react-icons/fa";
import CountUp from 'react-countup';
import Footer from '../footer/Footer';

const testimonials = [
  {
    name: "Alice Johnson",
    city: "Indore, M.P",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    text: "This product changed the way our team works. Truly outstanding!",
  },
  {
    name: "Mark Thompson",
    city: "Pune, Maharashtra",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    text: "Excellent support and very easy to use interface. Highly recommend!",
  },
  {
    name: "Sara Lee",
    city: "Mumbai, Maharashtra",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    text: "The best investment we made this year. The results speak for themselves.",
  },
];

const stats = [
  { icon: '/icons/building.svg', end: 500, suffix: '+', label: 'Project Handover' },
  { icon: '/icons/building.svg', end: 1000, suffix: '+', label: 'Monthly Visitors' },
  { icon: '/icons/building.svg', end: 500, suffix: '+', label: 'Property Ready' },
  { icon: '/icons/building.svg', end: 95, suffix: '%', label: 'Happy Customers' },
];


function About() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <>
      <Header />
      <section className="about-hero">
        <div className="about-hero-overlay">
          <div className="about-hero-content">
            <h1>About Us</h1>
            <div className="about-breadcrumb">
              <span>Home</span>
              <span className="about-breadcrumb-sep"> &gt; </span>
              <span className="about-breadcrumb-current">About Us</span>
            </div>
          </div>
        </div>
      </section>
      <section className="py-5 bg-white" ref={ref}>
        <motion.div
          className="container d-flex flex-wrap justify-content-center align-items-start gap-5"
          initial={{ opacity: 0, y: 80 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Left: Image Grid */}
          <div className="position-relative d-flex justify-content-center align-items-center min-w-420px">
            <div
              className="d-grid"
              style={{
                gridTemplateColumns: '180px 120px',
                gridTemplateRows: '120px 180px 120px',
                gap: '18px',
              }}
            >
              <img
                src="/images/estate.jpg"
                alt="Property 1"
                className="img-fluid rounded-4 shadow-lg"
                style={{
                  gridColumn: '1 / span 2',
                  gridRow: '2 / span 2',
                  width: '320px',
                  height: '260px',
                  objectFit: 'cover',
                }}
              />
              <img
                src="/images/estate2.jpg"
                alt="Property 2"
                className="img-fluid rounded-3 shadow-sm"
                style={{
                  gridColumn: '1',
                  gridRow: '1',
                  width: '140px',
                  height: '110px',
                  objectFit: 'cover',
                }}
              />
              <img
                src="/images/estate3.jpg"
                alt="Property 3"
                className="img-fluid rounded-3 shadow-sm"
                style={{
                  gridColumn: '2',
                  gridRow: '1',
                  width: '180px',
                  height: '110px',
                  objectFit: 'cover',
                }}
              />
              <img
                src="/images/estate4.jpg"
                alt="Property 4"
                className="img-fluid rounded-3 shadow-sm"
                style={{
                  gridColumn: '1',
                  gridRow: '3',
                  width: '140px',
                  height: '110px',
                  objectFit: 'cover',
                }}
              />
            </div>
            <div
              className="position-absolute bg-white rounded-circle shadow-sm p-1"
              style={{ top: '60px', right: '-40px', width: '90px', height: '80px' }}
            >
              <img
                src="/images/logo-CMrIGaUI.png"
                alt="Real Estate Logo"
                className="img-fluid"
                style={{ width: '90px', height: '70px', objectFit: 'contain' }}
              />
            </div>
          </div>

          {/* Right: Content */}
          <div className="flex-grow-1" style={{ maxWidth: '540px' }}>
            <div className="mb-4">
              <span className="text-danger fw-semibold d-inline-block mb-2">About Us</span>
              <h2 className="fw-bold mb-3">
                Discover Our Luxury Property,
                <br />
                With Full Amenities
              </h2>
              <p className="text-muted">
              Where elegance meets comfort. Experience a lifestyle of sophistication with top-tier amenities 
              designed for your ultimate convenience and enjoyment.
              </p>
            </div>

            <div className="row g-4 mb-4">
              {[
                ['💬', 'Quality Services', ' Real Estate Services tailored to meet your unique needs.'],
                ['📝', 'Clients Feedback', 'Clients appreciate smooth, home-buying experience.'],
                ['📦', 'Space Belongings', 'Clients love our spacious properties, designed for comfort and style.'],
                ['✨', 'Trusted Expertise', 'Trusted experience. Smarter real estate decisions.'],
              ].map(([icon, title, desc], i) => (
                <div className="col-12 col-md-6" key={title}>
                  <motion.div
                    className="d-flex align-items-start gap-3 bg-light rounded-4 shadow p-3 border border-danger"
                    initial={{ opacity: 20, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
                  >
                    <div className="fs-4 text-danger">
                      <span role="img" aria-label={title}>
                        {icon}
                      </span>
                    </div>
                    <div>
                      <h5 className="fw-semibold mb-1">{title}</h5>
                      <p className="text-muted mb-0">{desc}</p>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>

            <motion.div
              className="d-flex align-items-center gap-4 flex-wrap"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <button className="btn btn-dark btn-lg rounded-pill fw-semibold px-4">
                More About Us
              </button>
            </motion.div>
          </div>
        </motion.div>
      </section>
      <section className="bg-dark text-white py-5 position-relative">
        <div className="container">
          <div className="row text-center">
            {stats.map((stat, idx) => (
              <div key={idx} className="col-6 col-md-3 mb-4">
                <h2 className="fw-bold mb-2 text-white text-center">
                  <i class="fa-solid fa-building fs-3 pe-3"></i>
                  <CountUp end={stat.end} duration={2.5} suffix={stat.suffix} />
                </h2>
                <p className="mb-0">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-5 bg-white text-center">
        <div className="container">
          <div className="mb-4">
            <p className="text-danger fw-semibold d-flex justify-content-center align-items-center gap-2">
              <h6 className="">Testimonials</h6>
              
            </p>
            <h2 className="fw-bold fs-3">What Clients Say About AssetBazar</h2>
          </div>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            loop={true}
            className="mySwiper"
            style={{ padding: "50px 0" }}
          >
            {testimonials.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="d-flex flex-column align-items-center px-3">
                  <FaQuoteRight size={48} className="text-pink mb-3" style={{ color: "#fbb6ce" }} />
                  <p className="lead fw-semibold mb-4" style={{ maxWidth: "900px" }}>
                    “{item.text}”
                  </p>

                  <div className="mb-3 text-warning">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="mx-1" />
                    ))}
                  </div>

                  <img
                    src={item.image}
                    alt={item.author}
                    className="rounded-circle border border-danger mb-2"
                    style={{ width: "85px", height: "85px", objectFit: "cover", borderWidth: "4px" }}
                  />
                  <h5 className="fw-bold mb-0">{item.name}</h5>
                  <small className="text-muted">{item.city}</small>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
      <Footer/>
    </>
  );
};

export default About;