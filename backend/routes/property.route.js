import express from 'express';
import { createProperty, updateProperty, bookmark, deleteProperty, myProperties, bookmarkedProperties, getPropertyById, getAllProperties, contactOwner, searchProperties} from "../controller/property.controller.js";
import { isAuth } from "../middlewares/isAuth.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.post('/create',isAuth,upload.array('propertyImages', 5),createProperty);
router.put('/:id',isAuth,upload.array('propertyImages', 5),updateProperty);     
router.put('/bookmark/:id',isAuth,bookmark);
router.delete('/:id',isAuth,deleteProperty);
router.get('/myproperties',isAuth,myProperties);
router.get('/bookmarkedproperties',isAuth,bookmarkedProperties);
router.get('/find/:id',getPropertyById);
router.get('/all-properties',getAllProperties);
router.post('/contact-owner',isAuth,contactOwner);
router.get('/search', searchProperties);

export default router;
