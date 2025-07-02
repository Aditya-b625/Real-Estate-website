// import Header from '../header/Header';
// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate, useParams } from 'react-router-dom';
// import { myProfile, updateUser} from '../../apiRoute';
// import axiosInstance from '../../util/axios';
// import { toast, ToastContainer } from "react-toastify";
// import './updateProfile.css';

// function Updateprofile() {
//     const { id } = useParams();                     //for fetching the id from params
//     const [preview, setPreview] = useState(null);   //for image preview
//     const [formData, setFormData] = useState({
//         name: '',
//         contact: '',
//         password: '',
//         profileImage: null,
//         email: ''
//     });

//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchData = async () => {
//             const res = await myProfile();
//             const user = res.data.user;
//             setFormData({
//                 ...formData,
//                 name: user.name,
//                 contact: user.contact,
//                 email: user.email
//             });
//         };
//         fetchData();
//     }, []);

//     // When preview changes (when a new image is selected), clean up the previous object URL:
//     useEffect(() => {
//         return () => {
//             if (preview) {
//                 URL.revokeObjectURL(preview);
//             }
//         };
//     }, [preview]);

//     const handleChange = (e) => {
//         const { name, value, files } = e.target;
//         if (name === 'profileImage') {

//             if (preview) URL.revokeObjectURL(preview);  // Clean up previous preview
//             const objectUrl = URL.createObjectURL(files[0]);
//             setPreview(objectUrl);
//             setFormData({ ...formData, profileImage: files[0] });
//         } else {
//             setFormData({ ...formData, [name]: value });
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const payload = new FormData();
//         Object.keys(formData).forEach((key) => {
//             if (formData[key]) payload.append(key, formData[key]);
//         });

//         // await updateUser(payload); // <-- pass ID here // Your backend should handle FormData
//         await updateUser(id,payload);
//         toast.success('Profile updated!');
//         setTimeout(() => {
//             navigate("/myprofile");
//           }, 2500);
//     };

//     return (
//         <>
//             <ToastContainer/>
//             <Header />
//             <div className="container mt-4 py-2 pb-5">
//                 <h3 className="text-center mb-4">Update Your Profile</h3>
//                 <div className='formbox'>
//                     <form onSubmit={handleSubmit} className="p-4 shadow-lg rounded bg-white" encType="multipart/form-data">
//                         <div className="mb-3">
//                             <label>Email</label>
//                             <input type="email" className="form-control" value={formData.email} disabled />
//                         </div>
//                         <div className="mb-3">
//                             <label>Name</label>
//                             <input type="text" maxLength={20} className="form-control" name="name" value={formData.name} onChange={handleChange} required />
//                         </div>
//                         <div className="mb-3">
//                             <label>Contact</label>
//                             <input inputMode='numeric' maxlength={10} minLength={10} className="form-control" max='10' name="contact" value={formData.contact} onChange={handleChange} required />
//                         </div>
//                         {/* <div className="mb-3">
//                         <label>New Password</label>
//                         <input type="password" className="form-control" name="password" onChange={handleChange} />
//                     </div> */}
//                         <div className="mb-3">
//                             <label>Profile Image</label>
//                             <input type="file" className="form-control" name="profileImage" onChange={handleChange} />
//                         </div>
//                         {preview && (
//                             <div className="text-center mt-3">
//                                 <p className="mb-2">Preview:</p>
//                                 <img
//                                     src={preview}
//                                     alt="Preview"
//                                     className="img-thumbnail"
//                                     style={{ width: '150px', height: '150px', objectFit: 'cover' }}
//                                 />
//                             </div>
//                         )}
//                         <button type="submit" className="btn btn-primary w-40 mt-3 ms-2">Update</button>
//                         <Link  to='/myprofile' className="btn btn-danger w-40 mt-3 ms-3">Cancel</Link>
//                     </form>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Updateprofile;

// UpdateProfileModal.js
import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { toast } from "react-toastify";
import { updateUser } from '../../apiRoute';

const UpdateProfileModal = ({ showupdateModal, setShowUpdateModal, user, setUser }) => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    profileImage: null,
  });
  const [preview, setPreview] = useState(null); 

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        contact: user.contact,
        profileImage: null,
      });
    }
  }, [user]);

    //  When preview changes (when a new image is selected), clean up the previous object URL:
    useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
                console.log("Preview updated: ", preview);
            }
        };
        
    }, [preview]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profileImage') {

      if (preview) URL.revokeObjectURL(preview);  // Clean up previous preview
          const objectUrl = URL.createObjectURL(files[0]);
          setPreview(objectUrl);
      setFormData({ ...formData, profileImage: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) payload.append(key, formData[key]);
    });

    try {
      await updateUser(user._id,payload);
      toast.success('Profile updated successfully!');
      setShowUpdateModal(false);
      // Optionally, fetch updated user data and set it to state
      setUser({ ...user, ...formData }); // Update local user state
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error("Failed to update profile");
    }
  };

  return (
    <Modal show={showupdateModal} onHide={() => setShowUpdateModal(false)} centered>
      <Modal.Header className='' closeButton>
        <Modal.Title className='text-center w-100'>Update Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="text"
              className="form-control"
              name="email"
              value={formData.email}
              disabled
            />
          </div>
          <div className="mb-3">
            <label>Contact</label>
            <input
              // type="number"
              inputMode='numeric'
              className="form-control"
              name="contact"
              maxLength={10}
              minLength={10}
              value={formData.contact}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label>Profile Image</label>
            <input
              type="file"
              className="form-control"
              name="profileImage"
              onChange={handleChange}
            />
          </div>
          {preview && (
            <div className="">
              <p className="mb-2">Preview:</p>
              <img
                src={preview}
                alt="Preview"
                className="img-thumbnail"
                style={{ width: '100px', height: '100px', objectFit: 'cover', border: '1px solid black' }}
              />
            </div>
          )}
          <button type="submit" className="btn btn-primary w-100 mt-3">
            Update Profile
          </button>
        </form>
      </Modal.Body>
      <Modal.Footer className='pt-1 pb-1'>
        <Button variant="secondary btn-sm" onClick={() => setShowUpdateModal(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateProfileModal;
