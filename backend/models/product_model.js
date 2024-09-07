const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  items: [
    {
      name: { type: String, required: true },
      imageUrl: { type: String, required: true },
      price: { type: Number, required: true },
    },
  ],
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
