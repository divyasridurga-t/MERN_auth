import mongoose from "mongoose";

let userSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "products"
        },
        quantity: {
            type: Number,
            default: 1,
            required: true
        },
        color: {
            type: String,
            required: true
        },
        size: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }]
})


let userCartModel = new mongoose.model("usercart", userSchema);
export default userCartModel;