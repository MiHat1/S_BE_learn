import * as productService from '../services/product.service.js';

export const getAllProducts = async (req, res, next) => {
    try {
        const products = await productService.getAllProducts();
        return res.status(200).json({
            success: true,
            data: products,
        });
    } catch (err) {
        next(err);
    }
}

export const getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await productService.getProductById(id);
        return res.status(200).json({
            success: true,
            data: product,
        });
    } catch (err) {
        next(err);
    }
}

export const createProduct = async (req, res, next) => {
    try {
        const product = await productService.createProductService(req.body);
        res.status(201).json({
            message: "Tạo sản phẩm thành công",
            data: product
        });
    } catch (error) {
        next(error);
    }
};

export const updateProduct = async (req, res, next) => {
    try {
        const product = await productService.updateProductService(
            req.params.id,
            req.body
        );

        res.status(200).json({
            message: "Cập nhật sản phẩm thành công",
            data: product
        });
    } catch (error) {
        next(error);
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        await productService.deleteProductService(req.params.id);

        res.status(200).json({
            message: "Xóa sản phẩm thành công"
        });
    } catch (error) {
        next(error);
    }
};