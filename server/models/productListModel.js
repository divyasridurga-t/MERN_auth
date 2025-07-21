import mongoose from "mongoose";

let productSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  singleproduct: {
    type: Boolean,
    required: false,
  },
  pricearray: {
    type: Array,
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  searchCategory: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: true,
  },
  sizes: {
    type: Array,
    required: false,
  },
  color: {
    type: String,
    required: false,
  },
  offers: {
    type: Array,
    reuired: false,
  },
  productDetail: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const productModel = mongoose.model("products", productSchema);

export default productModel;
