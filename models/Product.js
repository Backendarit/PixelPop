const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true },
    price: { 
        type: Number, 
        required: true },
    category: String, 
    imageUrl: String,
    inStock: { 
        type: Boolean, 
        default: false },
    altText: {
        type: String,
        required: true
             }
});

module.exports = mongoose.model("Products", productSchema);