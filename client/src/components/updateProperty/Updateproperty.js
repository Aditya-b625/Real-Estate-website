import React ,{ useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { getPropertyById, updateProperty } from '../../apiRoute';
import './updateproperty.css';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import {toast} from 'react-toastify';

function Updateproperty(){
    const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    location: '',
    price: '',
    beds: '',
    sqft: '',
    desc: '',
    furnished: "",
    balconies: "",
    floor: "",
    facing: "",
    status: "",
    ageOfConstruction: ""
  });
  // const [image, setImage] = useState(null);
  // const [preview, setPreview] = useState('');
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await getPropertyById(id);
        console.log(res.data);
        const prop = res.data;
        setFormData({
          title: prop.title,
          type: prop.type,
          location: prop.location,
          price: prop.price,
          beds: prop.beds,
          sqft: prop.sqft,
          desc: prop.desc,
          furnished: prop.furnished,
          balconies: prop.balconies,
          floor: prop.floor,
          facing: prop.facing,
          status: prop.status,
          ageOfConstruction: prop.ageOfConstruction
        });
        setPreviews(prop.propertyImages.map(img => `http://localhost:5000${img}`));
      } catch (err) {
        console.error('Error loading property', err);
      }
    };
    fetchProperty();
  }, [id]);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleImageChange = (e) => {
    // const file = e.target.files[0];
    // setImage(file);
    // setPreview(URL.createObjectURL(file));
    const files = Array.from(e.target.files);

    if (files.length > 5) {
      toast.error('You can only upload a maximum of 5 images!');
      return;
    }
    
    // Limit the selection to the first 5 images
     const limitedFiles = files.slice(0, 5);
    // Store the limited files in the state
    setImages(limitedFiles);

    const previewUrls = limitedFiles.map((file) => URL.createObjectURL(file));
    setPreviews(previewUrls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateData = new FormData();
    Object.entries(formData).forEach(([key, val]) => updateData.append(key, val));
    // if (image) updateData.append("propertyImage", image);
    images.forEach((img) => updateData.append("propertyImages", img));
    
    try {
      await updateProperty(id, updateData);
      toast.success("Property updated successfully!");
      setTimeout(() => {
        navigate(`/view-more/${id}`);
      }, 2500);
    } catch (err) {
      console.error("Update failed", err);
      toast.error(err.response?.data?.message);
    }
  };

    return (
        <>
        <Header/> 
        {/* <div className="container my-5 p-4 bg-white rounded-4 shadow-lg">
          <h3 className="mb-5">Update your listed Property</h3>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label>Title</label>
                <input type="text" name="title" required value={formData.title} onChange={handleChange} className="form-control" />
              </div>
               <div className="col-md-6 mb-3">
                <label>Type</label>
                <select
                  className="form-select"
                  required
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                >
                  <option value="">Choose...</option>
                  <option value="Plot">Plot</option>
                  <option value="House">House</option>
                  <option value="Villa">Villa</option>
                  <option value="Flat">Flat</option>
                </select>
              </div>
               <div className="col-md-6 mb-3">
                <label>Location</label>
                <select
                  className="form-select"
                  required
                  value={formData.location}
                  name="location"
                  onChange={handleChange}
                >
                  <option value="">Choose...</option>
                  <option value="Indore">Indore</option>
                  <option value="Bhopal">Bhopal</option>
                  <option value="Ujjain">Ujjain</option>
                  <option value="Jabalpur">Jabalpur</option>
                  <option value="Pune">Pune</option>
                  <option value="Mumbai">Mumbai</option>
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <label>Price</label>
                <input type="number" name="price" required value={formData.price} onChange={handleChange} className="form-control" />
              </div>
              <div className="col-md-6 mb-3">
                <label>Bedrooms</label>
                <input type="number" name="beds" max='4' min='1' value={formData.beds} onChange={handleChange} className="form-control" />
              </div>
              <div className="col-md-6 mb-3">
                <label>Area (sqft)</label>
                <input type="number" name="sqmeters" required value={formData.sqmeters} onChange={handleChange} className="form-control" />
              </div>
              <div className="col-md-12 mb-3">
                <label>Description</label>
                <textarea name="desc" value={formData.desc} required onChange={handleChange} className="form-control" />
              </div>
              <div className="col-md-6 mb-3">
                <label>Furnished</label>
                <select
                  className="form-select"
                  required
                  name="furnished"
                  value={formData.furnished}
                  onChange={handleChange}
                >
                  <option value="">Choose...</option>
                  <option value="Fully-Furnished">Fully-Furnished</option>
                  <option value="Semi-Furnished">Semi-Furnished</option>
                  <option value="Unfurnished">Unfurnished</option>
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <label>Facing(Direction of property)</label>
                <select
                  className="form-select"
                  required
                  name="facing"
                  value={formData.facing}
                  onChange={handleChange}>
                  <option value="">Choose...</option>
                  <option value="North">North</option>
                  <option value="South">South</option>
                  <option value="East">East</option>
                  <option value="West">West</option>
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  required
                  name="status"
                  value={formData.status}
                  onChange={handleChange}>
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
                <select
                  className="form-select"
                  name="ageOfConstruction"
                  value={formData.ageOfConstruction}
                  onChange={handleChange}>
                  <option value="">Choose...</option>
                  <option value="New Construction">New Construction (0–1 Year Old)</option>
                  <option value="Relatively New">Relatively New (1–5 Years Old)</option>
                  <option value="Mid-Age Property">Mid-Age Property (5–10 Years Old)</option>
                  <option value="Old Construction">Old Construction (10–20 Years Old)</option>
                  <option value="Very Old Property">Very Old Property (20+ Years)</option>
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Balconies</label>
                <input type="number" name="balconies" value={formData.balconies} className="form-control" placeholder="Eg. 2" onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label className="form-label">Floors</label>
                <input type="number" name="floor" value={formData.floor} className="form-control" placeholder="Total floors" onChange={handleChange} />
              </div>
              <div className="col-md-6 mb-3">
                <label>Update Image</label>
                <input type="file" accept="image/*" onChange={handleImageChange} className="form-control" />
                {preview && <img src={preview} alt="Preview" className="img-fluid rounded shadow mt-3 ms-2" style={{ height: "70px", objectFit: "cover" }} />}
              </div>

            </div>
            <button type="submit" className="btn btn-primary w-100">Update Property</button>
          </form>
        </div> */}
          
          <div className="container-fluid px-sm-5 px-3 py-5 update">
          <div className="row justify-content-center mt-5">
          <div className="update-form-box col-lg-9 col-13 py-4 px-5 rounded-4 shadow-lg mt-5">
      <h2 className="mb-4 text-center">Update Your Property Listing</h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data">

        {/* General Info */}
        <div className="mb-4">
          <h5 className="mb-3 border-bottom pb-2">General Information</h5>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label>Property Title</label>
              <input type="text" name="title" required value={formData.title} onChange={handleChange} className="form-control" placeholder="e.g. Luxurious 3BHK in Mumbai" />
            </div>
            <div className="col-md-6 mb-3">
              <label>Property Type</label>
              <select className="form-select" required name="type" value={formData.type} onChange={handleChange}>
                <option value="">Select Type</option>
                <option value="Plot">Plot</option>
                <option value="House">House/Villa</option>
                <option value="Flat">Flat</option>
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label>Location</label>
              <select className="form-select" required name="location" value={formData.location} onChange={handleChange}>
                <option value="">Select City</option>
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
            <div className="col-md-6 mb-3">
              <label>Price (INR)</label>
              <input type="number" name="price" required value={formData.price} onChange={handleChange} className="form-control" placeholder="e.g. 7500000" />
            </div>
          </div>
        </div>

        {/* Property Specifications */}
        <div className="mb-4">
          <h5 className="mb-3 border-bottom pb-2">Specifications</h5>
          <div className="row">
            <div className="col-md-4 mb-3">
              <label>Bedrooms</label>
              <input type="number" name="beds" min="1" max="10" value={formData.beds} onChange={handleChange} className="form-control" placeholder="e.g. 3" />
            </div>
            <div className="col-md-4 mb-3">
              <label>Area (sq. ft.)</label>
              <input type="number" name="sqft" required value={formData.sqft} onChange={handleChange} className="form-control" placeholder="e.g. 1250" />
            </div>
            <div className="col-md-4 mb-3">
              <label>Balconies</label>
              <input type="number" name="balconies" value={formData.balconies} onChange={handleChange} className="form-control" placeholder="e.g. 2" />
            </div>
            <div className="col-md-4 mb-3">
              <label>Total Floors</label>
              <input type="number" name="floor" value={formData.floor} onChange={handleChange} className="form-control" placeholder="e.g. 5" />
            </div>
            <div className="col-md-4 mb-3">
              <label>Furnishing</label>
              <select className="form-select" name="furnished" required value={formData.furnished} onChange={handleChange}>
                <option value="">Choose...</option>
                <option value="Fully-Furnished">Fully-Furnished</option>
                <option value="Semi-Furnished">Semi-Furnished</option>
                <option value="Unfurnished">Unfurnished</option>
              </select>
            </div>
            <div className="col-md-4 mb-3">
              <label>Facing</label>
              <select className="form-select" name="facing" value={formData.facing} onChange={handleChange}>
                <option value="">Choose...</option>
                <option value="North">North</option>
                <option value="South">South</option>
                <option value="East">East</option>
                <option value="West">West</option>
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label>Status</label>
              <select className="form-select" required name="status" value={formData.status} onChange={handleChange}>
                <option value="">Choose...</option>
                <option value="Ready to Move">Ready to Move</option>
                <option value="Under Construction">Under Construction</option>
                <option value="New Launch">New Launch</option>
                <option value="Under Renovation">Under Renovation</option>
                <option value="Resale Property">Resale Property</option>
                <option value="Possession Soon">Possession Soon</option>
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label>Age of Construction</label>
              <select className="form-select" name="ageOfConstruction" value={formData.ageOfConstruction} onChange={handleChange}>
                <option value="">Choose...</option>
                <option value="New Construction">New Construction (0–1 Year)</option>
                <option value="Relatively New">Relatively New (1–5 Years)</option>
                <option value="Mid-Age Property">Mid-Age Property (5–10 Years)</option>
                <option value="Old Construction">Old Construction (10–20 Years)</option>
                <option value="Very Old Property">Very Old Property (20+ Years)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <h5 className="mb-3 border-bottom pb-2">Description</h5>
          <textarea name="desc" value={formData.desc} required onChange={handleChange} className="form-control" rows="4" placeholder="Write about the property, location, highlights etc." />
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <h5 className="mb-3 border-bottom pb-2">Update Image</h5>
          <input type="file" name="propertyImages" multiple accept="image/*" onChange={handleImageChange} className="form-control w-50" />
              {previews.length > 0 && (
                <div className="d-flex flex-wrap gap-2 mt-3">
                  {previews.map((src, idx) => (
                  <img key={idx} src={src} alt={`preview-${idx}`} className="rounded shadow" style={{ height: "90px",width:"120px", objectFit: "cover",border:'1px solid grey' }} />
                  ))}
                </div>
                )}
        </div>

        {/* Submit */}
        <button type="submit" className="btn btn-primary w-100">Update Property</button>
      </form>
      </div>
      </div>
    </div>

    <Footer/>
        </>
    )
}

export default Updateproperty;
