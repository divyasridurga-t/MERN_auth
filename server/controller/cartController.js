import userCartModel from "../models/userCartModel.js";
import productModel from "../models/productListModel.js";
import userModel from "../models/userModel.js";
import mongoose from "mongoose";
mongoose.Promise = global.Promise


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
                    cartItems.items.push({ productId, quantity })
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
                console.log(items);
                
                let itemData = await productModel.findById(items.productId)
                return {
                    title: itemData.title,
                    description: itemData.description,
                    category: itemData.category,
                    color: items.color,
                    size: items.size,
                    price: items.price,
                    quantity: items.quantity,
                }
            })
        );
        return res.status(200).json({
            status: true,
            data: cartData
        })

    } catch (error) {
        return res.status(404).json({
            status: false,
            message: error.message
        })
    }
}