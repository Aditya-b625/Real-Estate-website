import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../util/axios';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import './home.css';
import Footer from '../footer/Footer';

function Home() {
  const [propertyType, setPropertyType] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [location, setLocation] = useState('');
  const [properties, setProperties] = useState([]);
  const [searchDone, setSearchDone] = useState(false); // Track whether search is done
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSearch = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get('/property/search', {
        params: { propertyType, priceRange, location }
      });
      setProperties(res.data);
      setSearchDone(true);
    } catch (err) {
      console.error(err);
      setSearchDone(true);
    }finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setPropertyType('');
    setPriceRange('');
    setLocation('');
    setProperties([]);
    setSearchDone(false);
  };

  const scroll = (scrollOffset) => {
    const container = document.getElementById('property-scroll-container');
    container.scrollLeft += scrollOffset;
  };

  const handlePostPropertyClick = () => {
    navigate('/list-property');
  };

  //services section
  const services = [
    {
      title: "Buying a residential property",
      description: "House, Villa, Land, Flat, and more",
      image: "/images/property.png",
    },
    {
      title: "Sell your property",
      description: "House, land, Flat, and more",
      image: "/images/inside.png",
    },
    {
      title: "Buy Plots/Land",
      description: "Residential Plots, Agricultural Farm lands, and more",
      image: "/images/plots.png",
    },
    {
      title: "Wide range of properties",
      description: "Explore a variety of properties across different locations and price ranges",
      image: "/images/search.png",
    },
    {
      title: "Contact owner",
      description: "Get in touch with property owners directly",
      image: "/images/contactowner.jpg",
    },
  ];

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  //cities section
  const cities = [
    {
      name: 'Indore',
      properties: '153,000+ Properties',
      image: '/images/indore.jpg',
    },
    {
      name: 'Bhopal',
      properties: '33,000+ Properties',
      image: '/images/chennai.jpg',
    },
    {
      name: 'Bangalore',
      properties: '37,000+ Properties',
      image: '/images/bangalore.jpg',
    },
    {
      name: 'Pune',
      properties: '34,000+ Properties',
      image: '/images/pune.jpg',
    },
    
    {
      name: 'Mumbai',
      properties: '34,000+ Properties',
      image: '/images/mumbai.jpg',
    },
    {
      name: 'Nashik',
      properties: '22,000+ Properties',
      image: '/images/hyderabad.jpg',
    },
    {
      name: 'Nagpur',
      properties: '28,000+ Properties',
      image: '/images/kolkata.jpg',
    },
    {
      name: 'Ahmedabad',
      properties: '22,000+ Properties',
      image: '/images/ahmedabad.jpg',
    },
  ];


  return (
    <>
      <div className="hero-section text-white py-5">
        <div className="container-fluid homesection">
          <h1 className="mb-1 me-5 text-center">Let Me Find Your Dream Place Now</h1>
          <h2 className="mb-1 me-5 pe-1 text-center">Search The Best Selection Of Luxury Properties</h2>

          <div className="row g-1 justify-content-center px-3 me-2 ms-4 ps-4" id='search-filter'>
            <div className="col-12 col-sm-4 col-md-2">
              <select className="form-select" onChange={(e) => setPropertyType(e.target.value)}>
                <option value=''>Property type</option>
                <option value="House">House/Villa</option>
                <option value="Flat">Flat</option>
                <option value="Plot">Plot</option>
              </select>
            </div>
            <div className="col-12 col-sm-4 col-md-2">
              <select className="form-select" onChange={(e) => setPriceRange(e.target.value)}>
                <option value=''>Select price range</option>
                <option value="1000000-2000000">₹10Lac - ₹20Lac</option>
                <option value="2000000-5000000">₹20Lac - ₹50Lac</option>
                <option value="5000000-10000000">₹50Lac - ₹1Cr</option>
                <option value="above 10000000">Above ₹1Cr</option>
              </select>
            </div>
            <div className="col-12 col-sm-4 col-md-2">
              <select className="form-select" onChange={(e) => setLocation(e.target.value)}>
                <option value=''>Location</option>
                <option value='Indore'>Indore</option>
                <option value='Bhopal'>Bhopal</option>
                <option value="Ujjain">Ujjain</option>
                <option value='Jabalpur'>Jabalpur</option>
                <option value='Mumbai'>Mumbai</option>
                <option value="Pune">Pune</option>
                <option value="Nashik">Nashik</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Nagpur">Nagpur</option>
                <option value="Ahmedabad">Ahmedabad</option>
              </select>
            </div>
            <div className="col-12 col-sm-4 col-md-2">
              <button className="search-btn" onClick={handleSearch}><i class="fa-solid fa-magnifying-glass"></i></button>
              <button onClick={handleClear} className="ms-2 btn btn-outline btn-danger">
                Clear Filters
              </button>
            </div>
          </div>
         
          <div className="scroll-container-wrapper position-relative mt-5">
            {loading && (
              <div className="text-center my-4">
                <div className="spinner-border text-light" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}

            {!loading && properties.length > 0 && (
              <>
                <button className="scroll-btn left me-2" onClick={() => scroll(-300)}>←</button>
                <div className="scroll-container ms-5 me-5" id="property-scroll-container">
                  {properties.map((property) => (
                    <div className="property-card1" key={property._id}>
                      <div className="ms-3 card h-100">
                        <div className='search-img' style={{ height: '170px' }}>
                          <img src={`https://real-estate-backend-q59x.onrender.com${property.propertyImages[0]}`} style={{ height: '170px' }} className="card-img-top" alt="..." />
                        </div>
                        <div className="card-body">
                          <h6 className="card-title">{property.title}</h6>
                          <div className='d-flex'>
                            <p className="card-text"><i class="fa-solid fa-location-dot"></i> {property.location}<span className='ms-2 me-2'>|</span></p>
                            <p className="card-text" style={{ color: 'blue' }}>{property.sqft} sqft</p>
                          </div>
                          <p className="card-text">₹{property.price}</p>
                          <a href={`/property/${property._id}`} className="btn btn-primary btn-sm">
                            View Details
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="scroll-btn right" onClick={() => scroll(300)}>→</button>
              </>
            )}
            {/* "No properties found" only after search is done */}
            {!loading && searchDone && properties.length === 0 && (
              <h5 className="text-center mt-4">No properties found in selected filter</h5>
            )}
          </div>
        </div>
      </div>

      {/* register section */}
      <div className="bg-light py-5">
        <Container className="post-container shadow-sm p-4 rounded px-5">
          <Row className="align-items-center">
            {/* Text Content */}
            <Col md={6} className="text-center text-md-start mb-4 mb-md-0 me-5">
              <motion.p
                className="text-muted fw-bold small"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                SELL YOUR PROPERTY
              </motion.p>

              <motion.h2
                className="fw-bold"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                Register to post your property for{' '}
                <span className="badge bg-success fs-6">FREE</span>
              </motion.h2>

              <motion.p
                className="text-secondary mt-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Post your residential / commercial property
              </motion.p>

              {/* Stats */}
              <Row className="mt-4 mb-3">
                <Col xs={4}>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <h4 className="fw-bold">500+</h4>
                    <p className="small text-muted">Property Listings</p>
                  </motion.div>
                </Col>
                <Col xs={4}>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <h4 className="fw-bold">1000+</h4>
                    <p className="small text-muted">Monthly Searches</p>
                  </motion.div>
                </Col>
                <Col xs={4}>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    <h4 className="fw-bold">500+</h4>
                    <p className="small text-muted">Successful Deals Closed</p>
                  </motion.div>
                </Col>
              </Row>

              {/* Button */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <Button onClick={handlePostPropertyClick} variant="primary" className="px-4 py-2 fw-semibold">
                  List your property for FREE
                </Button>

              </motion.div>
            </Col>

            {/* Image */}
            <Col md={5} className="text-center">
              <motion.img
                src="/images/home.jpg"
                alt="Register illustration"
                className="img-fluid rounded"
                style={{ width: "100%", maxWidth:'460px', height: "350px", marginLeft: "auto", marginRight: "auto", objectFit: "cover" }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
              />
            </Col>
          </Row>
        </Container>
      </div>

      {/* services section */}
      <div className="services explore-wrapper py-5 shadow" style={{ backgroundColor: "#fdf7f1", borderRadius: "20px" }}>
        <Container className='ms-4'>
          <h6 className="text-muted">Asset Bazar</h6>
          <h2 className="fw-bold mb-4">Explore our services</h2>
          <Card className="pt-4 ps-5 pe-4 shadow-sm border-0" style={{ marginRight: '130px' }}>
            <Row>
              {services.map((service, index) => (
                <Col key={index} xs={12} md={6} lg={4} className="mb-4" data-aos="fade-up" data-aos-delay={index * 100}>
                  <div className="d-flex align-items-start">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="me-3"
                      style={{ width: "70px", height: "60px", objectFit: "cover" }}
                    />
                    <div>
                      <h6 className="">{service.title}</h6>
                      <p className="text-muted small mb-0 border-bottom pb-1">{service.description}</p>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Card>
        </Container>
      </div>

      {/* cities section */}
      <section className="py-5 mb-5">
        <Container>
          <p className="text-uppercase text-muted fw-semibold mb-1">Top Cities</p>
          <h2 className="fw-bold mb-4">Explore Real Estate in Popular Indian Cities</h2>

          <Row xs={3} md={4} sm={2} lg={4} className="g-4">
            {cities.map((city, index) => (
              <Col className='col-10' key={index}>
                <Card className="border-0 city-card h-100">
                  <div className="d-flex align-items-center">
                    <img
                      src={city.image}
                      alt={city.name}
                      className="rounded"
                      style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                    />
                    <div className="ms-3">
                      <h6 className="fw-semibold mb-1">{city.name}</h6>
                      <p className="text-muted small mb-0">{city.properties}</p>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

     <Footer/>
    </>
  )
}

export default Home;

