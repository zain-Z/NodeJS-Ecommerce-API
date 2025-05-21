import Product from "../model/Product.js";
import asyncHandler from "express-async-handler";

// @desc create new product
// @route POST /api/v1/products
// @access Private/Admin

export const createProductCtrl = asyncHandler(async (req, res) => {
    const { name, description, brand, category, price, sizes, colors, totalQty } =
        req.body;
    
    // check if product already exists
    const productExists = await Product.findOne({ name });
    if (productExists) {
        res.status(400);
        throw new Error("Product already exists");
    }

    // create product
    const product = await Product.create({
        name,
        description,
        brand,
        category,
        price,
        sizes,
        colors,
        totalQty,
        user: req.userAuthId
    });

    // push product to category
    

    res.status(201).json({
        status: "success",
        message: "Product created successfully",
        product
    });
});

// @desc Get all products
// @route GET /api/v1/products
// @access public

export const getAllProductsCtrl = asyncHandler(async (req, res) => {
    //query
    let productQuery = Product.find();

    // search by name
    if (req.query.name) {
        productQuery = productQuery.find({ name: { $regex: req.query.name, $options: "i" }, });
    }

    // search by brand
    if (req.query.brand) {
        productQuery = productQuery.find({ brand: { $regex: req.query.brand, $options: "i" }, });
    }

    // search by category
    if (req.query.category) {
        productQuery = productQuery.find({ category: { $regex: req.query.category, $options: "i" }, });
    }

    // search by colors
    if (req.query.colors) {
        productQuery = productQuery.find({ colors: { $regex: req.query.colors, $options: "i" }, });
    }

    // search by sizes
    if (req.query.sizes) {
        productQuery = productQuery.find({ sizes: { $regex: req.query.sizes, $options: "i" }, });
    }

    // search by price
    if (req.query.price) {
        const price = req.query.price.split("-");
        productQuery = productQuery.find({ price: { $gte: price[0], $lte: price[1] }, });
    }

    // pagination
    // page
    const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
    // limit
    const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 10;
    // startIndex
    const startIndex = (page - 1) * limit;
    // endIndex
    const endIndex = page * limit;
    // total
    const total = await Product.countDocuments();

    productQuery = productQuery.skip(startIndex).limit(limit);

    // pagination result
    const pagination = {};
    if (endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit: limit
        };
    }
    if (startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit: limit
        };
    }

    //await the query
    const products = await productQuery;

    res.status(200).json({
        status: "success",
        results: products.length,
        products,
        msg: "Products fetched successfully",
        pagination
    });
});

// @desc Get single product
// @route GET /api/v1/products/:id
// @access public

export const getSingleProductCtrl = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }
    res.status(200).json({
        status: "success",
        product
    });
});
