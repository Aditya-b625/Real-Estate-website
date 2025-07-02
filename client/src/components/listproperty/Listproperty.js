import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap"; 
import { createProperty } from "../../apiRoute";
import Footer from '../footer/Footer';
import {toast} from "react-toastify";
import './listproperty.css';

function Listproperty(){
    const navigate = useNavigate();
    const [showAuthModal, setShowAuthModal] = useState(false);
  
    /* -------------- 1. Auth check -------------- */
    useEffect(() => {
      const token = sessionStorage.getItem("token");
      if (!token) {
        setShowAuthModal(true);
      }
    }, []);
  
    /* -------------- 2. Local form state -------------- */
    const [formData, setFormData] = useState({
      title: "",
      type: "",
      desc: "",
      price: "",
      sqft: "",
      location: "",
      beds: "",
      furnished: "Unfurnished",
      balconies: "",
      floor: "N/A",
      facing: "N/A",
      status: "Ready to Move",
      ageOfConstruction: "",
      propertyImages: [],
    });
  
    const handleChange = (e) => {
      const { name, value, files } = e.target;
      if (name === "propertyImages") {
        const selected = [...files].slice(0, 5);
        setFormData({ ...formData, propertyImages: selected });
      } else {
        setFormData({ ...formData, [name]: value });
      }
    };
  
    /* -------------- 3. Submit -------------- */
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const data = new FormData();
        // append normal fields
        Object.entries(formData).forEach(([k, v]) => {
          if (k !== 'propertyImages') data.append(k, v);
        });

        // append each image under the SAME field-name
        formData.propertyImages.forEach((file) =>
          data.append('propertyImages', file)
        );
        console.log(data);
        await createProperty(data);
        toast.success("Property listed successfully");
        setTimeout(() => {
          navigate("/myprofile");
        }, 2500);
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to list property");
        console.log(err);
      }
    };
  
    /* -------------- 4. UI -------------- */
    return (
      <>
        {/* ---------- Auth required modal ---------- */}
        <Modal show={showAuthModal} onHide={() => {}}>
          <Modal.Header>
           <Modal.Title>Login required</Modal.Title>
            </Modal.Header>
              <Modal.Body>
                You need to sign in before listing a property.
              </Modal.Body>
             <Modal.Footer>
             <Button
             variant="secondary"
             size="sm"
             onClick={() => {
             setShowAuthModal(false);
             navigate("/"); //Redirect to Home
           }}
            >
            Back to Home
            </Button>
            <Button
            variant="primary"
            size="sm"
            onClick={() => {
            setShowAuthModal(false);
            navigate("/signin"); //Redirect to Login
          }}
          >
           Go to Login
          </Button>
        </Modal.Footer>
        </Modal>
  
        {/* ---------- Form ---------- */}
        {!showAuthModal && (
            <div className="container-fluid px-sm-5 px-3 py-5 list-property"> 
            <div className="row justify-content-center">
            <div className="col-lg-9 col-13"> 
          
            <h3 className="text-center mb-4 fw-bold">List your property</h3>
            <div className="property-form-box shadow-lg">
                  <form className="row g-4" onSubmit={handleSubmit}>
                    {/* --- Section: Basic Info --- */}
                    <h5 className="form-section-title">🏠 Property Basic Details</h5>

                    <div className="col-md-6">
                      <label className="form-label">Title</label>
                      <input type="text" name="title" className="form-control" placeholder="Eg. 3 BHK Luxury Flat" required onChange={handleChange} />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Type</label>
                      <select className="form-select" name="type" required onChange={handleChange}>
                        <option value="">Choose...</option>
                        <option value="Plot">Plot</option>
                        <option value="House">House/Villa</option>
                        <option value="Flat">Flat</option>
                      </select>
                    </div>

                    <div className="col-md-12">
                      <label className="form-label">Description</label>
                      <textarea className="form-control" rows="3" name="desc" placeholder="Tell us more about your property" required onChange={handleChange}></textarea>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Price (₹)</label>
                      <input type="number" name="price" className="form-control" placeholder="Eg. 4500000" required onChange={handleChange} />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Area (sq. ft.)</label>
                      <input type="number" name="sqft" className="form-control" placeholder="Eg. 1200" required onChange={handleChange} />
                    </div>

                    {/* --- Section: Features --- */}
                    <h5 className="form-section-title">🛏️ Features</h5>

                    <div className="col-md-4">
                      <label className="form-label">Bedrooms</label>
                      <input type="number" name="beds" className="form-control" placeholder="Eg. 3" onChange={handleChange} />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label">Balconies</label>
                      <input type="number" name="balconies" className="form-control" placeholder="Eg. 2" onChange={handleChange} />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label">Floors</label>
                      <input type="number" name="floor" className="form-control" placeholder="Total floors" onChange={handleChange} />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Furnished</label>
                      <select className="form-select" name="furnished" onChange={handleChange}>
                        <option value="">Choose...</option>
                        <option value="Fully-Furnished">Fully-Furnished</option>
                        <option value="Semi-Furnished">Semi-Furnished</option>
                        <option value="Unfurnished">Unfurnished</option>
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Facing(Direction of property)</label>
                      <select className="form-select" name="facing" onChange={handleChange}>
                        <option value="">Choose...</option>
                        <option value="North">North</option>
                        <option value="South">South</option>
                        <option value="East">East</option>
                        <option value="West">West</option>
                      </select>
                    </div>

                    {/* --- Section: Status --- */}
                    <h5 className="form-section-title">📦 Property Condition</h5>

                    <div className="col-md-6">
                      <label className="form-label">Status</label>
                      <select className="form-select" name="status" onChange={handleChange}>
                        <option value="">Choose...</option>
                        <option value="Ready to Move">Ready to Move</option>
                        <option value="Under Construction">Under Construction</option>
                        <option value="New Launch">New Launch</option>
                        <option value="Under Renovation">Under Renovation</option>
                        <option value="Resale Property">Resale Property</option>
                        <option value="Possession Soon">Possession Soon</option>
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Age of Construction</label>
                      <select className="form-select" name="ageOfConstruction" onChange={handleChange}>
                        <option value="">Choose...</option>
                        <option value="New Construction">New Construction(0–1 Year Old)</option>
                        <option value="Relatively New">Relatively New(1–5 Years Old)</option>
                        <option value="Mid-Age Property">Mid-Age Property(5–10 Years Old)</option>
                        <option value="Old Construction">Old Construction(10–20 Years Old)</option>
                        <option value="Very Old Property">Very Old Property(20+ Years)</option>
                      </select>
                    </div>

                    {/* --- Section: Location & Image --- */}
                    <h5 className="form-section-title">📍 Location & Image</h5>

                    <div className="col-md-5 me-5">
                      <label className="form-label">Location</label>
                      <select className="form-select" name="location" required onChange={handleChange}>
                        <option value="">Choose...</option>
                        <option value="Indore">Indore</option>
                        <option value="Bhopal">Bhopal</option>
                        <option value="Ujjain">Ujjain</option>
                        <option value="Jabalpur">Jabalpur</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Pune">Pune</option>
                        <option value="Nashik">Nashik</option>
                        <option value="Bangalore">Bangalore</option>
                        <option value="Nagpur">Nagpur</option>
                        <option value="Ahemdabad">Ahmedabad</option>
                      </select>
                    </div>

                    <div className="col-md-6 ms-4">
                      <label className="form-label ms-1">Upload Property Image (max 5)</label>
                      <input type="file" name="propertyImages"  accept="image/*" multiple  className="form-control" required onChange={handleChange} />
                      {formData.propertyImages.length > 0 && (
                        <div className="d-flex gap-2 mt-2 overflow-auto">
                          {formData.propertyImages.map((img, i) => (
                            <img
                              key={i}
                              src={URL.createObjectURL(img)}
                              alt="preview"
                              style={{ width: '80px', height: '60px', objectFit: 'cover',border:'1px solid grey'}}
                              className="rounded"
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    {/* --- Submit Button --- */}
                    <div className="col-12 text-center mt-4">
                      <button className="btn btn-success px-5">List Property</button>
                    </div>
                  </form>
            </div>
          </div>
       </div>
     </div>
        )}

        <Footer />
      </>
    );
}

export default Listproperty;
