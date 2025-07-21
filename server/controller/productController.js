import productModel from "../models/productListModel.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

cloudinary.config({
  cloud_name: "dhjygngv2",
  api_key: process.env.API_KEY,
  api_secret: process.env.SECRET_KEY,
});

// post all products
export const postProducts = async (req, res) => {
    console.log(req.body)
  let userId = req.userId;
  let {
    title,
    description,
    price,
    category,
    image,
    sizes,
    color,
  } = req.body;
  if (
    !title ||
    !description ||
    !price ||
    !category ||
    !image ||
    !sizes ||
    !color
  ) {
    return res.status(400).json({
      status: false,
      message: "Missing details",
    });
  }
  try {
    let searchByCategory = category
      .toLowerCase()
      .replaceAll(" ", "-")
      .replaceAll("'", "");
    let products = new productModel({
      userId,
      title,
      description,
      price,
      category,
      image,
      sizes,
      color,
    });
    await products.save();
    return res
      .status(200)
      .json({ status: true, message: "data added successfully" });
  } catch (error) {
    console.log("error in posting products ===>>>", error);
    return res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

// get all products
export const getProducts = async (req, res) => {
  try {
    // optional ?page=1&limit=20 for pagination
    const { page = 1, limit = 20 } = req.query;

    const products = await productModel
      .find({ userId: req.userId })          // ✅ all products for this user
      .sort({ createdAt: -1 })               // newest first (optional)
      .skip((page - 1) * limit)              // pagination (optional)
      .limit(Number(limit))                  // pagination (optional)
      .lean();                               // plain JS objects = faster

    const total = await productModel.countDocuments({ userId: req.userId });

    return res.status(200).json({
      status: true,
      data: products,
      total,                                 // total items for front‑end pagination
      page: Number(page),
      limit: Number(limit),
    });
  } catch (error) {
    console.error("error in getting list of products ===>>>", error);
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};


// get with id
export const getProductsById = async (req, res) => {
  let { id } = req.params;
  try {
    let data = await productModel.find();
    let filteredData = data.filter((key) => {
      return String(key._id) == id;
    });
    if (filteredData.length) {
      return res.status(200).json({
        status: true,
        data: filteredData,
      });
    } else {
      return res.status(404).json({
        status: false,
        message: "data not found",
      });
    }
  } catch (error) {
    console.log("error in getting product ===>>>", error);
    return res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

// update product details with ID
export const updateProduct = async (req, res) => {
  let { id } = req.params;
  let updates = req.body;
  try {
    let newId = new mongoose.Types.ObjectId(id);
    let data = await productModel.findByIdAndUpdate(
      newId,
      { $set: updates }, // updates the specific fields only
      { new: true, runValidators: true }
    );
    if (data) {
      return res.status(200).json({
        status: true,
        data: data,
      });
    } else {
      return res.status(404).json({
        status: false,
        message: `product with id - ${id} not found`,
      });
    }
  } catch (error) {
    console.log("error in updating products", error.message);
    return res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

// delete product details with ID
export const deletProductWithId = async (req, res) => {
  let { id } = req.params;
  try {
    let newId = new mongoose.Types.ObjectId(id);
    let data = await productModel.findByIdAndDelete(newId);
    if (data) {
      return res.status(200).json({
        status: true,
        data: `product with id - ${id} deleted successfully`,
      });
    } else {
      return res.status(404).json({
        status: false,
        message: "id not found",
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

// get all categories
export const getAllcategories = async (req, res) => {
  try {
    let products = await productModel.find();
    let productCategory = [];
    for (let i of products) {
      // console.log(i._id.toString());
      productCategory.push(i ? i.category : "");
    }
    let categoryList = [...new Set(productCategory)];
    return res.status(200).json({
      status: true,
      data: categoryList,
    });
  } catch (error) {
    console.log("error in getting list of categories ===>>>", error);
    return res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

// get by category
export const getProductsByCategory = async (req, res) => {
  let { category } = req.params;
  category = category.toLowerCase().replaceAll(" ", "-");
  try {
    let data = await productModel.find();
    let filteredData = data.filter((key) => {
      return key.searchCategory ? key.searchCategory.includes(category) : "";
    });
    if (filteredData.length) {
      return res.status(200).json({
        status: true,
        data: filteredData,
      });
    } else {
      return res.status(404).json({
        status: false,
        message: "data not found",
      });
    }
  } catch (error) {
    console.log("error in category ===>>>", error);
    return res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

// upload images
export const UploadImage = async (req, res) => {
  
  try {
    let result = await cloudinary.uploader.upload(req.file.path, {
      folder: "image-upload",
    });
    if (result.url) {
      fs.unlinkSync(req.file.path);
      return res.status(200).json({
        status: true,
        message: "file uploaded successfully",
        url: result.url,
      });
    } else {
      return res.status(400).json({
        status: false,
        message: "something went wrong",
      });
    }
  } catch (error) {
    console.log("error in uploading image ===>>>", error);
    return res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};
// post api for cart

// get api for cart

// create swagger file for all the end points
//  PUT , PATCH , DELETE method for all the routes

// wishlist post
//  wishlist get
