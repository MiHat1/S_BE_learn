import * as productService from '../services/product.service.js';

export const getAllProducts = async (req, res, next) => {
    try {
        const { category, maxPrice } = req.query;
        const products = await productService.getAllProductsService({
            category,
            maxPrice,
        });

        res.status(200).json({
            success: true,
            data: products
        });
    }
    catch (error) {
        next(error);
    }
};

export const getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await productService.getProductByIdService(parseInt(id));
        return res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        next(error);
    }
};

export const createProduct = async (req, res, next) => {
    try {
        const { name, price, category, inStock } = req.body;
        const newProduct = await productService.createProductService({name, price, category, inStock});
        return res.status(201).json({
            success: true,
            statusCode: 201,
            data: newProduct
        });
    } catch (error) {
        next(error);
    }
};
