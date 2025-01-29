import WishListModel from "../models/wishlistModel.js";
import productModel from "../models/productListModel.js";
import userModel from "../models/userModel.js";
import mongoose from "mongoose";

export const createWishList = async (req, res) => {
    let userId = req.userId;
    let { productId, color, size } = req.body;
    try {
        let newuserId = new mongoose.Types.ObjectId(userId);
        let newProductId = new mongoose.Types.ObjectId(productId);

        let userData = await userModel.findOne({ _id: newuserId });
        if (!userData) {
            return res.status(404).json({
                status: false,
                message: "user not found"
            })
        }
        // if user exists check the product id in the DB 
        let productData = await productModel.findById(newProductId);
        // if product exists ? add to wishlist: product not found
        if (!productData) {
            return res.status(404).json({
                status: false,
                message: "product not found"
            })
        }
        // before adding to wishlist check whether the product present in the wishlist
        //  if yes ? return - product already exists: add to wishlist
        let wishlistData = await WishListModel.findOne({ userId: newuserId });
        if (!wishlistData) {
            wishlistData = new WishListModel({
                userId,
                items: [{ productId, color, size }]
            })
        } else {
            return res.status(200).json({
                status: true,
                message: "product already in wishlist"
            })
        }
        await wishlistData.save();
        return res.status(200).json({
            status: true,
            data: wishlistData
        })
    } catch (error) {
        console.log("error in creating wishlist===>>>", error.message);
        return res.status(400).json({
            status: false,
            message: error.message
        })
    }

}


export const getWishList = async (req, res) => {
    let userId = req.userId;
    try {
        let newuserId = new mongoose.Types.ObjectId(userId);
        // let newProductId = new mongoose.Types.ObjectId(productId);
        // get the data from wishlist DB
        let wishlistData = await WishListModel.findOne({ userId: newuserId });
        if (!wishlistData) {
            return res.status(200).json({
                status: true,
                message: "your wishlist is empty!"
            })
        }
        let { items = [] } = wishlistData;

        let data = await Promise.all(
            // loop the items and find the product id
            // find the data in products DB with product id
            items.map(async (key) => {
                let productData = await productModel.findById(key.productId)
                return {
                    id: productData._id || 'out of stock',
                    title: productData.title || 'out of stock',
                    description: productData.description || 'out of stock',
                    price: productData.price || 'out of stock',
                    image: productData.image || 'out of stock',
                    size: key.size || 'out of stock',
                    color: key.color || 'out of stock'
                }
            })
        )
        if (!data.length) {
            return res.status(200).json({
                status: true,
                message: "your wishlist is empty!"
            })
        }

        return res.status(200).json({
            status: true,
            message: "wishlist fetched successfully",
            data
        })

    } catch (error) {
        console.log("error in getting wishlist===>>>", error.message);
        return res.status(400).json({
            status: false,
            message: error.message
        })
    }
}

export const updateWishList = async (req, res) => {
    let userId = req.userId;
    let { id } = req.params;
    let data = req.body;
    let wishlistFields = {};
    try {
        Object.keys(data).forEach((key) => {
            if (key != 'userId' && key !== 'productId') {
                wishlistFields[`items.$.${key}`] = req.body[key]
            }
        })

        let newUserId = new mongoose.Types.ObjectId(userId);
        let newproductId = new mongoose.Types.ObjectId(id);
        let updatedData = await WishListModel.findOneAndUpdate(
            { userId: newUserId, "items.productId": newproductId },
            { $set: wishlistFields },
            { new: true }
        )
        if (!updatedData) {
            return res.status(404).json({
                status: false,
                message: "something went wrong"
            })
        }
        return res.status(200).json({
            status: true,
            message: "wishlist updated successfully",
            data: updatedData
        })

    } catch (error) {
        console.log("error in updating wishlist===>>>", error.message);
        return res.status(400).json({
            status: false,
            message: error.message
        })
    }
}


export const deleteWishList = async (req, res) => {
    let userId = req.userId;
    let { id } = req.params

    try {
        let newUserId = new mongoose.Types.ObjectId(userId);
        let newproductId = new mongoose.Types.ObjectId(id);
        let data = await WishListModel.findOneAndUpdate(
            { userId: newUserId, "items.productId": newproductId },
            {
                $pull: { items: { productId: newproductId } }
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
            message: "deleted successfully!",
            data
        })

    } catch (error) {
        console.log("error in deleting wishlist===>>>", error.message);
        return res.status(400).json({
            status: false,
            message: error.message
        })
    }
}