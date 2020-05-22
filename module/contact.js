const mongoose = require("mongoose")

const contactschema = new mongoose.Schema({
    unique_id: Number,
    firstname: String,
    lastname: String,
    email: String,
    subject: String,
    description: String,
    garage: String
})

module.exports = mongoose.model("contact", contactschema)