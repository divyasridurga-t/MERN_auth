import mongoose from "mongoose";

export const schema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "products"
        },
        color: {
            type: String,
            required: true
        },
        size: {
            type: String,
            required: true
        }
    }]
})


const WishListModel = new mongoose.model("wishlist", schema);

export default WishListModel;