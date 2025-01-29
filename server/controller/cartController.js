import userCartModel from "../models/userCartModel.js";
import productModel from "../models/productListModel.js";
import userModel from "../models/userModel.js";
import mongoose from "mongoose";
mongoose.Promise = global.Promise;


export const postCartProducts = async (req, res) => {
    let { productId, quantity, color, size, price } = req.body;

    let userId = req.userId;
    try {
        let newUserId = new mongoose.Types.ObjectId(userId);
        let newProductId = new mongoose.Types.ObjectId(productId);
        let doesUserExist = await userModel.findById(newUserId);

        if (doesUserExist) {
            let product = await productModel.findById(newProductId);
            if (!product) {
                return res.status(404).json({
                    status: false,
                    message: "product not found"
                })
            }

            let cartItems = await userCartModel.findOne({ userId: newUserId });

            if (!cartItems) {
                cartItems = new userCartModel({
                    userId,
                    items: [{ productId, quantity, color, size, price }]
                })

            } else {
                // check and update the qunatity
                let existingData = cartItems.items.findIndex((item) => {
                    return item.productId == productId
                });

                if (existingData !== -1) {
                    cartItems.items[existingData].quantity += Number(quantity)
                }
                else {
                    cartItems.items.push({ productId, quantity, color, size, price })
                }
            }
            await cartItems.save();
            return res.status(200).json({
                status: true,
                message: "items added to cart successfully"
            })
        } else {
            return res.status(404).json({
                status: false,
                message: "user not found"
            })
        }
    } catch (error) {
        console.log("error in posting products", error.message);
        return res.status(400).json({
            status: false,
            message: error.message
        })
    }

}

export const getCartProducts = async (req, res) => {
    let userId = req.userId;
    try {
        let newUserId = new mongoose.Types.ObjectId(userId)
        let data = await userCartModel.findOne({ userId: newUserId });
        if (!data || !data.items.length) {
            return res.status(200).json({
                status: true,
                message: "your cart is empty"
            })
        }
        let cartData = await Promise.all(
            data.items.map(async (items) => {
                let itemData = await productModel.findById(items.productId);
                return {
                    id: itemData?._id || 'out of stock',
                    title: itemData?.title || 'out of stock',
                    description: itemData?.description || 'out of stock',
                    category: itemData?.category || 'out of stock',
                    color: items?.color || 'out of stock',
                    size: items?.size || 'out of stock',
                    price: items?.price || 'out of stock',
                    image: items?.image || "out of stock",
                    quantity: items?.quantity || 'out of stock',
                }
            })
        );
        return res.status(200).json({
            status: true,
            data: cartData
        })

    } catch (error) {
        console.log("error in getting cart data==>>", error.message);
        return res.status(404).json({
            status: false,
            message: error.message
        })
    }
}


// update the products in cart

export const updateCartProducts = async (req, res) => {
    let userId = req.userId;
    let { id } = req.params;
    let updatedData_ = req.body;
    let updatedFields = {}

    try {
        let newUserId = new mongoose.Types.ObjectId(userId);
        let newproductId = new mongoose.Types.ObjectId(id);
        Object.keys(updatedData_).forEach((key) => {
            if (key != 'productId' && key != 'userId') {
                updatedFields[`items.$.${key}`] = req.body[key]
            }
        })
        let userData = await userCartModel.findOneAndUpdate(
            { userId: newUserId, "items.productId": newproductId },
            { $set: updatedFields },
            { new: true }
        );
        if (!userData) {
            return res.status(404).json({
                status: false,
                message: "not found"
            })
        }

        return res.status(200).json({
            status: true,
            data: userData
        })
    } catch (error) {
        console.log("error in updating cart data==>>", error.message);

        return res.status(200).json({
            status: false,
            message: error.message
        })
    }
}


// delete data from cart

export const deleteCartProducts = async (req, res) => {
    let userId = req.userId;
    let { id } = req.params;
    try {
        let newProductId = new mongoose.Types.ObjectId(id);
        let newUserId = new mongoose.Types.ObjectId(userId);

        let data = await userCartModel.findOneAndUpdate(
            { userId: newUserId, "items.productId": newProductId },
            {
                $pull: { items: { productId: newProductId } }
            },
            { new: true }
        )
        if (!data) {
            return res.status(404).json({
                status: false,
                message: "product not found"
            })
        }
        return res.status(200).json({
            status: true,
            message: "deleted successfully",
            data: data
        })

    } catch (error) {
        console.log(error.message);
        return res.status(400).json({
            status: 400,
            message: error.message
        })
    }
}