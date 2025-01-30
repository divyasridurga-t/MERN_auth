import mongoose from "mongoose";

let productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    singleproduct: {
        type: Boolean,
        required: false
    },
    pricearray: {
        type: Array,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    searchCategory: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    sizes: {
        type: Array,
        required: false
    },
    colors: {
        type: Array,
        required: false
    },
    offers: {
        type: Array,
        reuired: false
    },
    productDetail: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const productModel = mongoose.model("products", productSchema);

export default productModel;



