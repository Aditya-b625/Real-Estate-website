import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { getPropertyById, deleteProperty } from '../../apiRoute';
import { Modal, Button, Carousel } from 'react-bootstrap';
import { toast } from "react-toastify";
import Header from '../header/Header';
import './viewMore.css';

function Viewmore() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await getPropertyById(id);
        console.log(res.data);
        setProperty(res.data);
      } catch (error) {
        console.error("Error fetching property:", error);
      }
    };

    fetchProperty();
  }, [id]);

  const handleDelete = async () => {
    await deleteProperty(id);
    setShowModal(false);
    toast.success('Property removed successfully');
    setTimeout(() => {
      navigate("/myprofile");
    }, 2500);
  };

  if (!property) return <div className="text-center mt-5">Loading...</div>;

  return (
    <>
      <Header />

      <div className="container my-5 pt-5">
        <div className="border rounded shadow-sm p-4 bg-white mt-4">

          {/* Price and Title */}
          <div className="d-flex justify-content-between align-items-start mb-4">
            <div>
              <h4 className="fw-bold">₹{property.price.toLocaleString()} Lac</h4>
              <h5 className="mt-3">{property.title} <span className="text-primary">,{property.location}</span></h5>
            </div>
            {/* <i className="fas fa-bookmark fs-4 text-danger"></i> */}
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
                          src={`https://real-estate-backend-q59x.onrender.com${imgPath}`}
                          className="d-block w-100 rounded"
                          style={{ height: '350px', objectFit: 'cover', border:'1px solid grey'}}
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
              <div className="text-muted mt-2 ms-2">{property.propertyImages.length} Photos</div>
            </div>

            {/* Right: Details */}
            <div className="col-md">
              {/* Feature Box */}
              <div className="bg-light border rounded mb-4 p-3">
                <div className="row text-center">
                  <div className="col-6 col-md-4 mb-2">
                    <div className="small fw-semibold"><i className="fas fa-bed me-1"></i> Bedrooms</div>
                    <div className="text-muted">{property.beds || 'N/A'}</div>
                  </div>
                  <div className="col-6 col-md-4 mb-1">
                    <div className="small fw-semibold"><i className="fas fa-building me-1"></i> Balconies</div>
                    <div className="text-muted">{property.balconies || 'N/A'}</div>
                  </div>
                  <div className="col-6 col-md-4 mb-1">
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
                  <div className="text-dark">{property.floor || 'Not specified'}</div>
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

              <p><strong className='me-2 ms-5'>Owner:</strong>{property.currentOwner.name}
                {property.currentOwner?.profileImage ? <img
                  src={`https://real-estate-backend-q59x.onrender.com${property.currentOwner.profileImage}`}
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

          {/* contact buttons */}
          <div className="d-flex gap-3 ms-2 mt-1">
                <button className="btn btn-outline-danger btn-sm" onClick={() => setShowModal(true)}>Delete this property</button>
                <button className="btn btn-outline-success btn-sm" onClick={() => navigate(`/update-property/${property._id}`)}>Update this property</button>
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
            <span className="col-2 fw-semibold text-dark fs-5">{property.location}</span>
          </div>

          <div className="row mb-4">
            <span className="col-2 text-muted fs-5">Floors allowed for construction</span><br />
            <span className="col-2 fw-semibold text-dark fs-5">{property.floor || 'Not Specified'}</span>
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

      {/* Delete Property Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Property Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete your property? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" size="sm" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Viewmore;
