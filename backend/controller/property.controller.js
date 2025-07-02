import {Property} from '../models/property.model.js';
import TryCatch from '../middlewares/TryCatch.js';
import nodemailer from 'nodemailer';

//create property
export const createProperty = TryCatch(async(req,res)=>{
    // const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
    const imagePaths = req.files.map(f => `/uploads/${f.filename}`);
    const newProperty = await Property.create({ 
        title: req.body.title,
        type: req.body.type,
        // propertyImage: imageUrl,
        propertyImages: imagePaths,
        desc: req.body.desc,
        price: req.body.price,
        sqft: req.body.sqft,
        location: req.body.location,
        beds: req.body.beds,
        furnished:req.body.furnished,
        balconies: req.body.balconies,
        floor: req.body.floor,
        facing: req.body.facing,
        status: req.body.status,
        ageOfContruction: req.body.ageOfContruction,
        bookmarkedUsers: req.body.bookmarkedUsers,
        currentOwner: req.user.id 
    });
        return res.status(201).json({msg: "property created successfully",newProperty});
})

//update property
export const updateProperty = TryCatch(async(req,res)=>{
    const property = await Property.findById(req.params.id)
        if (property.currentOwner.toString() !== req.user.id) {
            throw new Error("You are not allowed to update other people's properties")
        }
        // if (req.file) {
        //     req.body.propertyImage = `/uploads/${req.file.filename}`; // You can customize path
        // }
         // Handle multiple image uploads
    if (req.files && req.files.length > 0) {
        const imagePaths = req.files.map(file => `/uploads/${file.filename}`);
        req.body.propertyImages = imagePaths; // assuming your schema expects an array
    }
        const updatedProperty = await Property.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        )
        return res.status(200).json({msg:"property updated successfully",updatedProperty})
})

//Bookmark property
export const bookmark = TryCatch(async(req,res)=>{
    let property = await Property.findById(req.params.id)

        if (property.currentOwner.toString() === req.user.id) {
            throw new Error("You are not allowed to bookmark your Own Property or project")
        }
        const isBookmarked = property.bookmarkedUsers.includes(req.user.id);
        if (isBookmarked){
            property.bookmarkedUsers = property.bookmarkedUsers.filter(id => id !== req.user.id)
            await property.save()
        } else {
            property.bookmarkedUsers.push(req.user.id)
            await property.save()
        }

        return res.status(200).json({
        msg: isBookmarked ? "property unbookmarked" : "property bookmarked",
        property});
});

//Delete property
export const deleteProperty = TryCatch(async(req,res)=>{
    const property = await Property.findById(req.params.id)

        if (property.currentOwner.toString() !== req.user.id) {
            throw new Error("You are not allowed to delete other people properties")
        }
        await property.deleteOne();
        return res.status(200).json({ msg: "Successfully deleted property" });
});

// fetch my properties
export const myProperties = TryCatch(async(req,res)=>{
    const properties = await Property.find({currentOwner: req.user.id})
    return res.status(200).json(properties)
});

// fetch bookmarked properties
export const bookmarkedProperties = TryCatch(async(req,res)=>{
    const properties = await Property.find({bookmarkedUsers: { $in: [req.user.id] } }).populate('currentOwner','-password')
    return res.status(200).json(properties);
});

// TODO FETCH INDIVIDUAL PROPERTY
export const getPropertyById =TryCatch(async(req,res)=>{
    const property = await Property.findById(req.params.id).populate('currentOwner','-password')

    if(!property){
        throw new Error('No such property with that id')
    }else{
        return res.status(200).json(property)
    }
})

//get all properties
export const getAllProperties = TryCatch(async(req,res)=>{
    const properties = await Property.find({}).populate("currentOwner", '-password')

    return res.status(200).json(properties)
})

//conatct owner via email
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.Gmail,
      pass: process.env.Password    
    },
  });

export const contactOwner = TryCatch(async(req, res) => {
    const { ownerEmail, propertyTitle, message } = req.body;
    const user = req.user; // 👈 from token
  
    if (!ownerEmail || !message || !propertyTitle) {
      return res.status(400).json({ error: 'Missing fields'});
    }
  
    const mailOptions = {
      from: process.env.Gmail,
      to: ownerEmail,
      replyTo: user.email,
      subject: 'New Contact Request for Your Property',
      html: `
        <h3>Hello Owner,</h3>
        <p><strong>${user.name}</strong> is interested in your property starts with title: ${propertyTitle}.</p>
        <p><strong>Message:</strong><br/> ${message}</p>
        <hr/>
        <p>Contact Email: <strong>${user.email}</strong></p>
        <br>
       <p style="text-align:center;">Team Asset Bazar</p>
      `
    };
  
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent to owner' });
  });

// Search properties
export const searchProperties = TryCatch(async (req, res) => {
    const { propertyType, priceRange, location } = req.query;
  
    const query = {};
  
    if (propertyType) {
      query.type = propertyType;
    }
  
    if (priceRange) {
        if (priceRange.includes('-')){
            const [minPrice, maxPrice] = priceRange.split('-').map(Number);
            query.price = { $gte: minPrice, $lte: maxPrice };
        }
        else if (priceRange.startsWith('above')){
            const min = parseInt(priceRange.replace('above', '').trim());
            query.price = { $gt: min };
        }
    }
  
    if (location) {
      query.location = location;
    }
  
    const properties = await Property.find(query).populate("currentOwner", '-password');
  
    return res.status(200).json(properties);
  });

