import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { getPropertyById, bookmark, bookmarkedProperties } from '../../apiRoute';
import { Modal, Button } from 'react-bootstrap';
import ContactOwnerModal from '../contactOwner/ContactOwnerModal';
import Header from '../header/Header';
import './propertyDetails.css';
import {toast} from 'react-toastify';
import { Carousel } from 'react-bootstrap';

function Propertydetails(){
    const navigate = useNavigate();
    const [contactShowModal, setContactShowModal] = useState(false);
    const [contactInfoModalShow, setContactInfoModalShow] = useState(false);
    const user = JSON.parse(sessionStorage.getItem('user'));
    const isLoggedIn = !!sessionStorage.getItem('token');
    // const loggedInUserId = sessionStorage.getItem('userid');
    const loggedInUserId = user?._id;
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [bookmarked, setBookmarked] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await getPropertyById(id);
          console.log(res.data);
          setProperty(res.data);
        } catch (err) {
          console.error('Failed to fetch property details', err);
        }
      };
      fetchData();
    }, [id]);

  // Fetch bookmarked properties
  useEffect(() => {
    const fetchBookmarked = async () => {
      try {
        const res = await bookmarkedProperties(); // Fetch bookmarked properties
        console.log(res.data);

        // Extract the _id from each property in the array
        const bookmarkedPropertiesIds = res.data.map(prop => prop._id);

        // Set the bookmarked property ids
        setBookmarked(bookmarkedPropertiesIds);
        console.log("Bookmarked property IDs:", bookmarkedPropertiesIds);
      } catch (err) {
        console.error('Error fetching bookmarked properties:', err);
      }
    };
    fetchBookmarked();
  }, []);

  const handleBookmark = async (propertyId, e) => {

    if (!isLoggedIn) {
      toast.error("Log in to bookmark this property");
      return;
    }
    try {
      const isBookmarked = bookmarked.includes(propertyId); // Check if the property is already bookmarked
      await bookmark(propertyId); // Send PUT request to bookmark/unbookmark the property

      // Update the bookmarked state accordingly
      setBookmarked((prev) => isBookmarked ? prev.filter((pid) => pid !== propertyId) : [...prev, propertyId] // Add or remove the property ID from the bookmarked list
      );

      toast.success(isBookmarked ? 'Bookmark removed' : 'Property Bookmarked');
    } catch (error) {
      console.error('Bookmark failed:', error);
      toast.warning(error.response.data.message);
    }
  };
  
    if (!property) return <div className="text-center mt-5">Loading...</div>;

    return (
        <>
        <Header/>
        <div className="container my-5 pt-5">
          <div className="border rounded shadow-sm p-4 bg-white mt-4">

            {/* Price and Title */}
            <div className="d-flex justify-content-between align-items-start mb-4 position-relative">
              <div>
                <h4 className="fw-bold">₹{property.price.toLocaleString()} Lac</h4>
                <h5 className="mt-3">{property.title} <span className="text-primary">,{property.location || "Location"}</span></h5>
              </div>
              <i
                className={`bookmark-icon ${bookmarked.includes(property._id) ? 'fas fa-bookmark bookmarked' : 'far fa-bookmark unbookmark'}`}
                onClick={() => handleBookmark(property._id)}
              ></i>
            </div>

            {/* Main Content */}
            <div className="row">
              {/* Left: Main Image */}
              <div className="col-md-6 mb-4 mb-md-0">
                {/* <img
                  src={`http://localhost:5000${property.propertyImage}`}
                  className="img-fluid rounded"
                  style={{ height: '350px', objectFit: 'cover', width: '100%' }}
                  alt="property"
                /> */}
                {property.propertyImages && property.propertyImages.length > 0 ? (
                  <Carousel interval={null} indicators={true}>
                    {property.propertyImages.map((imgPath, idx) => (
                      <Carousel.Item key={idx}>
                        <img
                          src={`http://localhost:5000${imgPath}`}
                          className="d-block w-100 rounded"
                          style={{ height: '350px', objectFit: 'cover',border:'1px solid grey'}}
                          alt={`Property Image ${idx + 1}`}
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                   ) : (
                  <img
                    src="/images/house0.jpg"
                    className="img-fluid rounded"
                    style={{ height: '350px', objectFit: 'cover', width: '100%',border:'1px solid grey'}}
                    alt="property"
                  />
                )} 
                <div className="text-muted mt-2 ms-2">{property.propertyImages.length || 0} Photos</div>
                {/* Contact Buttons */}
                <div className="d-flex gap-3 mt-5 ms-2">
                  {property.currentOwner._id !== loggedInUserId && (
                    <button className="btn btn-danger rounded-5"
                      onClick={() => {
                        if (isLoggedIn) {
                          setContactShowModal(true);
                        } else {
                          setShowModal(true);
                        }
                      }}
                    >Contact Owner</button>
                  )}
                  {property.currentOwner._id !== loggedInUserId && (
                  <button className="btn btn-danger rounded-5"
                  onClick={() => {
                    if (isLoggedIn) {
                      setContactInfoModalShow(true);
                    } else {
                      setShowModal(true); // reuse login required modal
                    }
                  }}
                  >Get Phone No.</button>
                  )}
                </div>
              </div>

              {/* Right: Details */}
              <div className="col-md">
                {/* Feature Box */}
                <div className="bg-light border rounded mb-4 p-3">
                  <div className="row text-center">
                    <div className="col-6 col-md-4 mb-3">
                      <div className="small fw-semibold"><i className="fas fa-bed me-1"></i> Bedrooms</div>
                      <div className="text-muted">{property.beds || 'N/A'}</div>
                    </div>
                    <div className="col-6 col-md-4 mb-3">
                      <div className="small fw-semibold"><i className="fas fa-building me-1"></i> Balconies</div>
                      <div className="text-muted">{property.balconies || 'N/A'}</div>
                    </div>
                    <div className="col-6 col-md-4 mb-3">
                      <div className="small fw-semibold"><i className="fas fa-couch me-1"></i> Furnished</div>
                      <div className="text-muted">{property.furnished || 'N/A'}</div>
                    </div>
                  </div>
                </div>

                {/* Info Grid */}
                <div className="row text-start mb-3">
                  <div className="col-4 mb-3 ms-5">
                    <div className="small fw-semibold">Carpet Area</div>
                    <div className="text-dark">{property.sqft} sqft</div>
                    <div className="text-muted small">₹{Math.round(property.price / property.sqft)}/sqft</div>
                  </div>
                  <div className="col-3 mb-3 ms-3">
                    <div className="small fw-semibold">Floor</div>
                    <div className="text-dark">{property.floor || 'Not Specified'}</div>
                  </div>
                  <div className="col-3 mb-3 ms-4">
                    <div className="small fw-semibold">Property Type</div>
                    <div className="text-dark">{property.type}</div>
                  </div>
                  <div className="col-4 mb-3 ms-5 mt-3">
                    <div className="small fw-semibold">Status</div>
                    <div className="text-dark">{property.status}</div>
                  </div>
                  <div className="col-3 mb-3 ms-3 mt-3">
                    <div className="small fw-semibold">Facing</div>
                    <div className="text-dark">{property.facing || 'Not specified'}</div>
                  </div>
                  <div className="col-3 mb-3 mt-3 ms-4">
                    <div className="small fw-semibold">Furnishing</div>
                    <div className="text-dark">{property.furnished}</div>
                  </div>
                  <div className="col-6 mb-3 mt-3 ms-5">
                    <div className="small fw-semibold">Age Of Construction</div>
                    <div className="text-dark">{property.ageOfConstruction}</div>
                  </div>
                </div>

                {/* Extra Details */}
                {/* <div className="text-success ">
              <i className="fas fa-compass me-2"></i>
              East Facing Property
            </div> */}
                <p><strong className='me-2 ms-5'>Owner:</strong>{property.currentOwner.name}
                  {property.currentOwner?.profileImage ? <img
                    src={`http://localhost:5000${property.currentOwner.profileImage}`}
                    alt="owner"
                    className="ms-2 me-2 rounded-circle"
                    style={{ width: "40px", height: "40px", objectFit: "cover", border: "2px solid green" }}
                  /> :
                    <img
                      src='/images/profile-photo.jpg'
                      alt="owner"
                      className="ms-2 me-2 rounded-circle"
                      style={{ width: "40px", height: "40px", objectFit: "cover", border: "2px solid green" }}
                    />}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="d-flex justify-content-end mt-4 text-muted small">
              <i className="fas fa-user-clock me-2"></i>
              <p className='mb-1'>Listed on {new Date(property.createdAt).toLocaleDateString()}</p>
            </div>
          </div>

          {/* More Details Section */}
          <div className="border rounded mt-5 p-4 bg-white">
            <h4 className="fw-bold mb-4">More Details</h4>

            <div className="row mb-4">
              <span className="col-2 text-muted fs-5">Price</span>
              <span className="col-3 fw-semibold text-dark fs-5">₹{property.price.toLocaleString()} Lac</span>
            </div>

            <div className="row mb-4">
              <span className="col-2 text-muted fs-5">Location</span><br />
              <span className="col-2 fw-semibold text-dark fs-5">{property.location || 'N/A'}</span>
            </div>
            <div className="row mb-4">
              <span className="col-2 text-muted fs-5">Floors allowed for construction</span><br />
              <span className="col-2 fw-semibold text-dark fs-5">{property.floor || 'Not specified'}</span>
            </div>

            <div className="row mb-4">
              <span className="col-2 text-muted fw-semibold fs-5">Description: </span>
              <span className="col-9 fs-5">
                {property.desc}
                <span className="text-primary" style={{ cursor: 'pointer' }}></span>
              </span>
            </div>

          </div>
        </div>

        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Login Required</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>You should be registered to contact the owner.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary btn-sm" onClick={() => navigate('/signin')}>
              Login
            </Button>
            <Button variant="secondary btn-sm" onClick={() => setShowModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* contact owner form */}
        <ContactOwnerModal
          show={contactShowModal}
          onHide={() => setContactShowModal(false)}
          userEmail={user?.email}
          userName={user?.name}
          ownerEmail={property.currentOwner.email}
          propertyTitle={property.title}
        />

        {/* get phone no. modal */}
        <Modal show={contactInfoModalShow} onHide={() => setContactInfoModalShow(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Owner Contact Info</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Owner Name:</strong> {property.currentOwner.name}</p>
            <p><strong>Phone Number:</strong> {property.currentOwner.contact || 'Not available'}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary btn-sm" onClick={() => setContactInfoModalShow(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        </>
    )
}

export default Propertydetails;