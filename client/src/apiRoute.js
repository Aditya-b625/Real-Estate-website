import axiosInstance from './util/axios'

export const signup = (formData) => axiosInstance.post('/auth/register', formData);

export const verifyOtp = (otpData) => axiosInstance.post('/auth/verify', otpData);

export const login = (formData) => axiosInstance.post('/auth/login', formData);

export const forgotPassword = (data) => axiosInstance.post('/auth/forgot', data);

export const resetPassword = (data) => axiosInstance.post('/auth/reset', data);

export const myProfile = ()=> axiosInstance.get('/user/me'); 

export const updateUser = (id,formData)=> axiosInstance.put(`/user/${id}`,formData,{
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const deleteUser = ()=> axiosInstance.delete('/user/delete');

export const myProperties = ()=> axiosInstance.get('/property/myproperties');

export const bookmark =(id)=> axiosInstance.put(`/property/bookmark/${id}`);

export const bookmarkedProperties = ()=> axiosInstance.get('/property/bookmarkedproperties');

export const createProperty = (data)=> axiosInstance.post('/property/create', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }); 

export const getPropertyById = (id)=> axiosInstance.get(`/property/find/${id}`);

export const updateProperty =(id,data)=> axiosInstance.put(`/property/${id}`,data, {
  headers: { 'Content-Type': 'multipart/form-data' },
});

export const deleteProperty = (id)=> axiosInstance.delete(`/property/${id}`);

export const getAllProperties = ()=> axiosInstance.get('/property/all-properties');

export const contactOwner = (data) => axiosInstance.post('/property/contact-owner', data);