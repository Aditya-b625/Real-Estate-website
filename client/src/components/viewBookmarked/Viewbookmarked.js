import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPropertyById, bookmark } from '../../apiRoute';
import ContactOwnerModal from '../contactOwner/ContactOwnerModal'; 
import { Modal, Button, Carousel } from 'react-bootstrap';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import {toast} from 'react-toastify';
import Header from '../header/Header'

function Viewbookmarked(){
  const {id} = useParams();
  const [property, setProperty] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(true); // assuming bookmarked by default
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(sessionStorage.getItem('user'));
  const [contactShowModal, setContactShowModal] = useState(false);
  const [contactInfoModalShow, setContactInfoModalShow] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await getPropertyById(id);
        console.log(res.data);
        setProperty(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching property:', err);
      }
    };

    fetchProperty();
  }, [id]);

  const handleBookmark = async () => {
    try {
      await bookmark(id);
      setIsBookmarked(prev => !prev);
    } catch (err) {
      console.error('Error toggling bookmark:', err);
    }
  };

  if (loading) return <div className="text-center my-5">Loading...</div>;

  const imageSrc = property.currentOwner.profileImage
  ? `https://real-estate-backend-q59x.onrender.com${property.currentOwner.profileImage}`
  : '/images/profile-photo.jpg';

    return (
        <>
          <Header/>  
        
     <div className="container my-5 pt-5">
      <div className="border rounded shadow-sm p-4 bg-white mt-4">

        {/* Price and Title */}
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div>
            <h4 className="fw-bold">₹{property.price.toLocaleString()} Lac</h4>
            <h5 className="mt-3">{property.title} <span className="text-primary">,{property.location || "Location"}</span></h5>
          </div>
          <div className="col-md-1 p-3 me-4 position-relative">
          <Button variant="outline-grey" onClick={handleBookmark}>
              {isBookmarked ? <FaBookmark size={20} /> : <FaRegBookmark size={20} />}
          </Button>
          </div>
          {/* <i className="fas fa-bookmark fs-4 text-danger"></i> */}
        </div>

        {/* Main Content */}
        <div className="row">
          {/* Left: Main Image */}
          <div className="col-md-6 mb-4 mb-md-0">
            {/*<img
              src={`http://localhost:5000${property.propertyImage}`}
              className="img-fluid rounded"
              style={{ height: '350px', objectFit: 'cover', width: '100%' }}
              alt="property"
            />*/}
            {property.propertyImages && property.propertyImages.length > 0 ? (
                  <Carousel interval={null} indicators={true}>
                    {property.propertyImages.map((imgPath, idx) => (
                      <Carousel.Item key={idx}>
                        <img
                          src={`https://real-estate-backend-q59x.onrender.com${imgPath}`}
                          className="d-block w-100 rounded"
                          style={{ height: '350px', objectFit: 'cover', border:'1px solid grey' }}
                          alt={`Property Image ${idx + 1}`}
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                ) : (
                  <img
                    src="/images/house0.jpg"
                    className="img-fluid rounded"
                    style={{ height: '350px', objectFit: 'cover', width: '100%', border:'1px solid grey' }}
                    alt="property"
                  />
                )}
            <div className="text-muted mt-2 ms-2">{property.propertyImages.length} Photos</div>
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
                <div className="text-dark">{property.floor || '1'}</div>
              </div>
              <div className="col-3 mb-3">
                <div className="small fw-semibold">Property Type</div>
                <div className="text-dark">{property.type || 'Resale'}</div>
              </div>
              <div className="col-4 mb-3 ms-5 mt-2">
                <div className="small fw-semibold">Status</div>
                <div className="text-dark">{property.status || 'Ready to Move'}</div>
              </div>
              <div className="col-3 mb-3 ms-3 mt-2">
                <div className="small fw-semibold">Facing</div>
                <div className="text-dark">{property.facing || 'East'}</div>
              </div>
              <div className="col-3 mb-3 mt-2">
                <div className="small fw-semibold">Furnishing</div>
                <div className="text-dark">{property.furnished || 'Furnished'}</div>
              </div>
              <div className="col-6 mb-3 mt-3 ms-5">
                <div className="small fw-semibold">Age Of Construction</div>
                <div className="text-dark">{property.age || 'New Construction'}</div>
              </div>
            </div>

            
                <p><strong className='me-2 ms-5'>Owner:</strong>{property.currentOwner.name}
                  <img
                    src={imageSrc}
                    alt="owner"
                    className="ms-2 me-2 rounded-circle"
                    style={{ width: "40px", height: "40px", objectFit: "cover", border: "2px solid green"}}
                  /> 
                </p>
          </div>
        </div>

            {/* Contact Buttons */}
            <div className="d-flex gap-3 ms-2">
              <button className="btn btn-danger rounded-5"
                  onClick={() => {setContactShowModal(true)}}
              >Contact Owner</button>
              <button className="btn btn-danger rounded-5"
                  onClick={() => {setContactInfoModalShow(true)}}
              >Get Phone No.</button>
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
    <span className="col-2 fw-semibold text-dark fs-5">{property.floor || '3'}</span>
  </div>

  <div className="row mb-4">
    <span className="col-2 text-muted fw-semibold fs-5">Description: </span>
    <span className="col-9 fs-5">
      {property.desc} ...
      <span className="text-primary" style={{ cursor: 'pointer' }}></span>
    </span>
  </div>

</div>
    </div>

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

export default Viewbookmarked;
