const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    _id: String,
    name: { type: String, required: true },
    imageUrls: { type: Array, required: false }, 
    stock: { type: Number, required: true },
    price: { type: Number, required: true },
    isActive: { type: Boolean, default: true },
    createdDate: { type: Date, default: Date.now },
    categories: [{type: String, ref: "Category"}]
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;