const mongoose = require("mongoose")

const platinumschema = new mongoose.Schema({
    unique_id: Number,
    users: Object,
    rent: String,
    catagory: String,
    title: String,
    image: String,
    image2: String,
    image3: String,
    image4: String,
    image5: String,
    image6: String,
    image7: String,
    image8: String,
    image9: String,
    bedroom: String,
    bathroom: String,
    created: {type:Date , default:Date.now},
    price: String,
    area: String,
    location: String,
    city: String,
    phonenumber: String,
    carparking:String,
    watertank: String,
    fireplace: String,
    wifi: String,
    fence: String,
    garden: String,
    discription: String 
})

module.exports = mongoose.model("platinum", platinumschema)