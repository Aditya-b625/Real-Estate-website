import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
    currentOwner: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true,
        min: 10
    },
    type: {
        type: String,
        enum: ["Plot","House","Villa","Flat"],
        required: true
    },
    desc: {
        type: String,
        required: true,
        min: 50,
    },
    //  propertyImage: {
    //  type: String,
    //  required: true
    // },
    propertyImages: {
        type: [String],   // ← array of URLs / paths
        validate: [imgs => imgs.length <= 5, 'Max 5 images allowed'],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    sqft: {
        type: Number,
        required: true,
        min: 5
    },
    location: {
        type: String,
        required: true
    },
    beds: {
        type: String,
        // required: true,
        min: 1,
        max: 4
    },
    furnished: {
        type: String,
        enum: ["Fully-Furnished", "Semi-Furnished", "Unfurnished"],
        required: false
    },
    balconies: {
        type: String,
        // required: true,
        // min: 0,
        // max: 3
    },
    floor: {
        type: String,
        default: "N/A"
        // required: true,
    },
    facing: {
        type: String,
        enum: ["East", "West", "North", "South", "N/A"],
        required: false
    },
    status: {
        type: String,
        enum: ["Ready to Move", "Under Construction", "New Launch", "Under Renovation", "Resale Property", "Possession Soon"],
        default: "Ready to Move"
    },
    ageOfConstruction: {
        type: String,
        enum: ["New Construction", "Relatively New", "Mid-Age Property", "Old Construction", "Very Old Property"],
        default: "Mid-Age Property"
    },
    bookmarkedUsers: {
        type: [String],
        default: []
    }
}, {timestamps: true})

export const Property = mongoose.model("Property", propertySchema);