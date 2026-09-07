const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  image: {
    url: String,
    public_id: String
  }
});

const Product=mongoose.model("Products",productSchema);
module.exports=Product;