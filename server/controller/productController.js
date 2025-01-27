import productModel from "../models/productListModel.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv'
dotenv.config();

cloudinary.config({
    cloud_name: "dhjygngv2",
    api_key: process.env.API_KEY,
    api_secret: process.env.SECRET_KEY

});

// post all products
export const postProducts = async (req, res) => {
    let { title, description, price, category, image } = req.body;
    if (!title || !description || !price || !category || !image) {
        return res.status(400).json({
            status: false,
            message: "Missing details"
        })
    }
    try {
        let searchByCategory = category.toLowerCase().replaceAll(" ", "-").replaceAll("'", "");
        let products = new productModel({
            title,
            description,
            price,
            category,
            searchCategory: searchByCategory,
            image
        })
        await products.save();
        return res.status(200).json({ status: true, message: "data added successfully" })
    } catch (error) {
        console.log("error in posting products ===>>>", error);
        return res.status(400).json({
            status: false,
            message: error.message
        })
    }
}

// get all products
export const getProducts = async (req, res) => {
    try {
        let products = await productModel.find();
        return res.status(200).json({ status: true, data: products })
    } catch (error) {
        console.log("error in getting list of products ===>>>", error);
        return res.status(400).json({
            status: false,
            message: error.message
        })
    }
}

// get with id
export const getProductsById = async (req, res) => {
    let { id } = req.params;
    try {

        let data = await productModel.find();
        let filteredData = data.filter((key) => {
            return String(key._id) == id
        })
        if (filteredData.length) {
            return res.status(200).json({
                status: true,
                data: filteredData
            })
        } else {
            return res.status(404).json({
                status: false,
                message: "data not found"
            })
        }

    } catch (error) {
        console.log("error in getting product ===>>>", error);
        return res.status(400).json({
            status: false,
            message: error.message
        })
    }
}

// get all categories
export const getAllcategories = async (req, res) => {
    try {
        let products = await productModel.find();
        let productCategory = []
        for (let i of products) {
            // console.log(i._id.toString());
            productCategory.push(i ? i.category : "")
        }
        let categoryList = [...new Set(productCategory)]
        return res.status(200).json({
            status: true,
            data: categoryList
        })
    } catch (error) {
        console.log("error in getting list of categories ===>>>", error);
        return res.status(400).json({
            status: false,
            message: error.message
        })
    }
}

// get by category
export const getProductsByCategory = async (req, res) => {
    let { category } = req.params;
    category = category.toLowerCase().replaceAll(" ", "-");
    try {
        let data = await productModel.find();
        let filteredData = data.filter((key) => {
            return key.searchCategory ? key.searchCategory.includes(category) : ""
        });
        if (filteredData.length) {
            return res.status(200).json({
                status: true,
                data: filteredData
            })
        } else {
            return res.status(404).json({
                status: false,
                message: "data not found"
            })
        }
    } catch (error) {
        console.log("error in category ===>>>", error);
        return res.status(400).json({
            status: false,
            message: error.message
        })
    }
}

// upload images
export const UploadImage = async (req, res) => {
    try {
        let result = await cloudinary.uploader.upload(req.file.path, {
            folder: "image-upload"
        })
        if (result.url) {
            fs.unlinkSync(req.file.path)
            return res.status(200).json({
                status: true,
                message: "file uploaded successfully",
                url: result.url
            })
        } else {
            return res.status(400).json({
                status: false,
                message: "something went wrong"
            })
        }
    } catch (error) {
        console.log("error in uploading image ===>>>", error);
        return res.status(400).json({
            status: false,
            message: error.message
        })
    }
}
// post api for cart

// get api for cart

// create swagger file for all the end points
//  PUT , PATCH , DELETE method for all the routes

// wishlist post 
//  wishlist get
