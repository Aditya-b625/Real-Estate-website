import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getAllProperties, bookmark, bookmarkedProperties } from '../../apiRoute';
import { Modal, Button } from 'react-bootstrap';
import {toast} from "react-toastify";
import ContactOwnerModal from '../contactOwner/ContactOwnerModal';
import Header from '../header/Header';
import './properties.css';
import PropertiesSkeleton from './PropertiesSkeleton';

function Properties(){
    const [properties, setProperties] = useState([]);
    const [bookmarked, setBookmarked] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [contactShowModal, setContactShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const user = JSON.parse(sessionStorage.getItem('user'));

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    setIsAuthenticated(!!token); // true if token exists
  }, []);

  useEffect(() => {
    const fetchAllProperties = async () => {
      try {
        setLoading(true);
        const res = await getAllProperties();
        console.log(res.data);
        setProperties(res.data);
      } catch (err) {
        console.error('Error fetching properties:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProperties();
  }, []);

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

  const handleBookmark = async (propertyId,e) => {
     e.stopPropagation(); //Stop event propagation to prevent Link from triggering
     e.preventDefault(); // Prevent default behavior of the Link (navigation)

    if (!isAuthenticated) {
      setShowModal(true);
      return;
    }
    try {
      const isBookmarked = bookmarked?.includes(propertyId); // Check if the property is already bookmarked
      await bookmark(propertyId); // Send PUT request to bookmark/unbookmark the property

      // Update the bookmarked state accordingly
      setBookmarked((prev) =>isBookmarked ? prev?.filter((pid) => pid !== propertyId) : [...prev, propertyId] // Add or remove the property ID from the bookmarked list
      );

      toast.success(isBookmarked ? 'Bookmark removed' : 'Property Bookmarked');
    } catch (error) {
      console.error('Bookmark failed:', error);
      toast.warning(error.response.data.message);
    }
  };

    return (
        <>
        <Header />
        <div className="container my-5">
          <h5 className="fw-bold mb-4">{properties.length} results | Owner Properties for Sale</h5>
          {loading && (
            <PropertiesSkeleton/>
        // <div className="text-center py-5">
        //   <div className="spinner-border" role="status" />
        // </div>
      )}
          {properties.map((prop, index) => (
            <Link to={`/property/${prop._id}`} className="text-decoration-none text-dark">
            <div className="card mb-4 rounded-4 border border-info property" key={index}>
              
              <div className="row g-0">
                {/* Image */}
                <div className="col-md-3 text-center p-3">
                  <img
                    src={`https://real-estate-backend-q59x.onrender.com${prop.propertyImages[0]}`}
                    alt="property"
                    className="img-fluid rounded"
                    style={{ height: '180px', objectFit: 'cover', width: '100%' }}
                  />
                  <div className="text-muted small mt-2"><p className='mb-1'>Last updated on {new Date(prop.updatedAt).toLocaleDateString()}</p></div>
                </div>

                {/* Details */}
                <div className="col-md-6 p-3 position-relative">
                  {/* Bookmark icon */}
                  <i
                    className={`bookmark-icon ${bookmarked.includes(prop._id) ? 'fas fa-bookmark bookmarked' : 'far fa-bookmark'}`}
                    onClick={(e) => handleBookmark(prop._id,e)}
                  ></i>
                  <h5 className="fw-bold text-muted mb-3">{`${prop.title}, ${prop.location}`}</h5>

                  {/* Info Strip */}
                  <div className="d-flex justify-content-between bg-light rounded border p-2 mb-3 me-2">
                    <div className="text-center w-100 border-end px-2">
                      <div className="fw-semibold small">PLOT AREA</div>
                      <div className="text-muted small">{prop.sqft} sqft</div>
                    </div>
                    <div className="text-center w-100 border-end px-2">
                      <div className="fw-semibold small">TYPE</div>
                      <div className="text-muted small">{prop.type || 'Resale'}</div>
                    </div>
                    <div className="text-center w-100 px-2">
                      <div className="fw-semibold small">BEDROOMS</div>
                      <div className="text-muted small">{prop.beds || 'N/A'}</div>
                    </div>
                  </div>

                  <p className="mb-0 text-muted small mb-3">{prop.desc?.slice(0, 80)}...</p>
                  <p className="mb-1 small fs-6"><strong>Owner:</strong> {prop?.currentOwner?.name}</p>
                </div>

                {/* Price & Buttons */}
                <div className="price col-md-3 d-flex flex-column justify-content-between align-items-center p-3 text-end">
                  <div>
                    <h5 className=" fw-bold mt-2 text-center">₹{prop.price.toLocaleString()}</h5>
                    <p className="text-muted small text-center">₹{Math.round(prop.price / prop.sqft)} per sqft</p>
                  </div>
                  <div className="w-100 d-grid gap-2">
                    <button className="btn btn-danger btn-sm ms-5 rounded-5 fs-6"
                     style={{ width: '60%' }}
                     onClick={(e) => {
                      e.preventDefault();
                      if (!isAuthenticated) {
                        toast.info('Please log in to contact the owner.');
                      } else {
                        if (prop?.currentOwner?._id === user?._id) {
                          toast.info('This property is yours');
                        }
                        else{
                          setContactShowModal(prop._id);
                        } 
                      }
                     }} // Prevent navigation when clicking
                     >Contact Owner</button>
                    {/* <button className="btn btn-outline-danger btn-sm ms-5 rounded-5 fs-6" style={{ width: '60%' }}>Get Phone No.</button> */}
                  </div>
                </div>
              </div>
            </div>
            </Link>
          ))}
        </div>

        {/* log in to bookmark modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton className="d-flex justify-content-center">
            <Modal.Title  className="text-center w-100">Login Required</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Log in to view bookmarked properties later.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary btn-sm" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary btn-sm" href="/signin"> {/* Or '/login' if more appropriate */}
              Log In
            </Button>
          </Modal.Footer>
        </Modal>

         {/* contact owner form */ }
         <ContactOwnerModal
          show = { contactShowModal }
          onHide ={() => setContactShowModal(false)}
          userEmail={user?.email}
          userName={user?.name}
          ownerEmail={properties.find((prop) => prop._id === contactShowModal)?.currentOwner.email}
          propertyTitle={properties.find((prop) => prop._id === contactShowModal)?.title}
          />
        </>
    )
}

export default Properties;
