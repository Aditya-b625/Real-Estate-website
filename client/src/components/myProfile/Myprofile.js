import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { myProfile, myProperties, bookmarkedProperties, deleteUser} from '../../apiRoute';
import UpdateProfileModal from '../updateProfile/UpdateProfileModal';
import { useNavigate } from 'react-router-dom';
import { toast} from "react-toastify";
import ListingCardSkeleton from './ListingCardSkeleton';
import './myProfile.css';

function Myprofile(){
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [properties, setProperties] = useState([]);
    const [mode, setMode] = useState("");   // '', 'listed', 'bookmarked'
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingUser, setLoadingUser] = useState(false);
    const [showupdateModal, setShowUpdateModal] = useState(false);
  
    useEffect(() => {
      //Fetch user profile once
      const fetchUser = async () => {
        try {
          setLoadingUser(true);
          const token = sessionStorage.getItem("token");
          const res = await myProfile(); // Update endpoint
         
          console.log(res);
          setUser(res.data.user);
        } catch (err) {
          console.error('Error fetching user data', err);
        } finally {
          setLoadingUser(false); // Set loading to false when the request finishes (either success or error)
        }
      };
  
      fetchUser();
    }, []);
  
    const fetchProperties = async (type) => {
      if (!type) return;
      try {
        setLoading(true);
        let data;
        if (type === "listed") {
          const res = await myProperties();
          data = res.data;
        } else {
          const res = await bookmarkedProperties();
          data = res.data;
        }
        console.log(data);
        setProperties(data);
      } catch (err) {
        console.error("Error fetching properties:", err);
      } finally {
        setLoading(false);
      }
    };

    /* Button click handlers */
    const handleShowListed = () => {
      setMode("listed");
      fetchProperties("listed");
    };
    const handleShowBookmarked = () => {
      setMode("bookmarked");
      fetchProperties("bookmarked");
    };

     /* Card used in both lists */
     const PropertyCard = ({ p }) => (
      <div className="property-card col-md-4 col-sm-4 mb-4">
        <div className="card shadow h-100" style={{boxShadow: 'rgb(219, 219, 219) 0px 3px 15px'}}>
        <div className='listingimage' style={{height:'220px'}}>
          <img
            src={`https://real-estate-backend-q59x.onrender.com${p.propertyImages[0]}`}
            alt={p.title}
            className="card-img-top"
            style={{ height: "220px", objectFit: "cover" }}
          />
          </div>
          <div className="d-flex flex-column pt-2 px-2 ps-3">
            <div className="d-flex justify-content-between align-items-center mb-2" >
              <h5 className="card-title mb-0 text-muted">{p.title}</h5>
              {mode==='listed'?
              <img
                //
              />
              :
              <img
                src={p?.currentOwner?.profileImage ? `https://real-estate-backend-q59x.onrender.com${p.currentOwner.profileImage}` : '/images/profile-photo.jpg'}
                alt="owner"
                className="rounded-circle"
                style={{
                  width: "35px",
                  height: "35px",
                  objectFit: "cover",
                  border: "1px solid",
                }}
              />}
            </div>
            <div className='d-flex'>
            <b className="mb-2">₹{p.price} <span className='ms-2 me-2'>|</span></b>
            <p className='mb-2 w-50' style={{color:'blue'}}>{p.sqft} Sq.ft</p>
            </div>
            <p className='mb-2'><i class="fa-solid fa-location-dot text-success"></i> {p.location}</p>
            
            <div className='d-flex flex-row justify-content-between'>
            <p className='mb-2'><i class="fa-solid fa-bed "></i> {p.beds? `${p.beds} bedrooms`:'N/A'}</p>
            {mode === "listed"?
            <button type='button' className='viewmore btn btn-success btn-sm w-40 mb-3'
                    onClick={()=>navigate(`/view-more/${p._id}`)}>View more</button>
              :  <button type='button' className='viewmore btn btn-success btn-sm w-40 mb-3'
              onClick={()=>navigate(`/view-bookmarked/${p._id}`)}>View more</button>
            }  
            </div>
          </div>
        </div>
      </div>
    );
    
    //to delete account
    const handleDeleteAccount = async () => {
      try {
        await deleteUser();
        setShowModal(false);
        sessionStorage.removeItem("token");
        toast.success('Account deleted successfully');
        setTimeout(() => {
          navigate("/");
        }, 2500);
        //navigate("/"); // Redirect to home or login
        // window.location.reload(); // refresh to reflect delete
      } catch (err) {
        console.error("Error deleting account:", err);
        toast.error("Failed to delete account");
      }
    };
    
    return (
        <>
        <section style={{backgroundColor: '#f8f9fa', height: '100vh'}}>
         <div className="container py-5 bg-lite">
            <div className="welcome-message">
              <p className=" text-left mb-1">
                Welcome back, <span className="">{user?.name.split(' ')[0]}</span> !
              </p>
            </div>
          <div className='p-3 bg-white rounded-4' style={{boxShadow: 'rgb(219, 219, 219) 0px 3px 15px'}}>
              {loadingUser && (
                <div className="text-center py-5">
                  <div className="spinner-border" role="status" />
                </div>
              )}
      {!loadingUser && user && (
        <div className="row justify-content-center text-center">
          <div className="col-md-2 ps-3 mt-3">
           {user.profileImage?<img
              src={`https://real-estate-backend-q59x.onrender.com${user.profileImage}`}
              className="img-fluid rounded-circle mb-3"
              alt="Profile"
              style={{ width: '120px', height: '120px', objectFit: 'cover', border: '2px solid green' }}
            />:
            <img
              src='/images/profile-photo.jpg'
              className="img-fluid rounded-circle mb-3"
              alt="Profile"
              style={{ width: '120px', height: '120px', objectFit:'cover', border: '2px solid green' }}
            />}
          </div>
          <div className="col-md-6 text-start py-2" style={{width:'50%'}}>
            <h5 className="fw-bold">{user.name}</h5>
            <p className='mb-2'>{user.email}</p>
            <p>{user.contact ? `+91 ${user.contact}` : 'update your contact'}</p>
            <p className='mb-1 mt-3'>Joined on {new Date(user.createdAt).toLocaleDateString()}</p>
            <p className='mb-1'>Last updated on {new Date(user.updatedAt).toLocaleDateString()}</p>
          </div>
          <div className="col-md-4 d-flex flex-column gap-2 align-items-end">
          <i class="fa-solid fa-lg fa-pen-to-square me-5 mb-3 mt-3" onClick={()=>setShowUpdateModal(true)} style={{ cursor: "pointer" }}></i>
          <i class="fa-solid fa-lg fa-trash me-5 mt-4 mb-1 text-danger"
             style={{ cursor: "pointer" }}
             onClick={() => setShowModal(true)}
          ></i>
          </div>
        </div>
      )}
      </div>
{/* <Link to='/updateprofile'></Link> */}
      {/* ---- Mode buttons ---- */}
      {/* <div className="text-center mt-4">
        <button className="btn btn-primary mx-2" onClick={fetchListedProperties}>
          Listed properties
        </button>
        <button className="btn btn-primary mx-2">
          Bookmarked properties
        </button>
      </div> */}

<div className="text-center my-4 mb-4">
        <button
          className={`btn mx-2 ${
            mode === "listed" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={handleShowListed}
        >
          Listed properties
        </button>
        <button
          className={`btn mx-2 ${
            mode === "bookmarked" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={handleShowBookmarked}
        >
          Bookmarked properties
        </button>
      </div>

      {/* ---- List headline ---- */}
      {mode && (
        <h4 className="text-center fw-bold mb-4 pb-4">
          {mode === "listed" ? "Listed properties" : "Bookmarked properties"}
        </h4>
      )}

      {/* ---- Loader or list ---- */}
      {loading && (
        <ListingCardSkeleton/>
        // <div className="text-center py-5">
        //   <div className="spinner-border" role="status" />
        // </div>
      )}

      {!loading && mode && properties.length === 0 && (
        <p className="text-center text-muted">No properties to show.</p>
      )}

      <div className="row">
        {properties.map((p) => (
          <PropertyCard key={p._id} p={p} />
        ))}
      </div>

      {/* {showProperties && (
        <>
          <h4 className="text-center mt-5 fw-bold">Listed properties</h4>
          <div className="row mt-4">
            {properties.map((property, index) => (
              <div key={index} className="col-md-4 mb-4">
                <div className="card shadow-sm">
                  <img
                    src={`/uploads/${property.image}`} // Update path
                    className="card-img-top"
                    alt="Property"
                    style={{ height: '250px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{property.title}</h5>
                    <p className="card-text">₹ {property.price}</p>
                    <div className="text-end">
                      <img
                        src={`/uploads/${user.profileImage}`}
                        alt="Owner"
                        className="rounded-circle"
                        style={{ width: '40px', height: '40px' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )} */}
    </div>

    {/* Delete Account Modal */}
<Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Account Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        Are you sure you want to delete your account? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" size="sm" onClick={handleDeleteAccount}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
        </section>

         {/* Use the UpdateProfileModal */}
        <UpdateProfileModal 
          showupdateModal={showupdateModal} 
          setShowUpdateModal={setShowUpdateModal} 
          user={user}
          setUser={setUser} 
        />
      
        </>
    )
}

export default Myprofile
