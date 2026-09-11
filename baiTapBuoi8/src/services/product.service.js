import { findProductsFromDB, findProductByIdFromDB, createProductDB, updateProductDB, deleteProductDB } from "../repositories/product.repository.js"

export const getAllProducts = async () => {
    return await findProductsFromDB();
}

export const getProductById = async (id) => {
    const numericId = parseInt(id);
    if (isNaN(numericId)) {
        const error = new Error("Product ID is not valid");
        error.statusCode = 400;
        throw error;
    }

    const product = await findProductByIdFromDB(numericId);
    if (!product) {
        const error = new Error("Product not found");
        error.statusCode = 404;
        throw error;
    }

    return product;
}

export const createProductService = async (data) => {
    const product = {
        name: data.name,
        price: Number(data.price),
        stock: data.stock === undefined ? 0 : Number(data.stock),
        category_id: data.category_id ?? null
    };

    validateProduct(product);

    return createProductDB(
        product.name.trim(),
        product.price,
        product.stock,
        product.category_id
    );
};

export const updateProductService = async (id, data) => {
    const oldProduct = await getProductById(id);

    const product = {
        name: data.name ?? oldProduct.name,
        price: data.price === undefined
            ? oldProduct.price
            : Number(data.price),
        stock: data.stock === undefined
            ? oldProduct.stock
            : Number(data.stock),
        category_id: data.category_id ?? oldProduct.category_id
    };

    validateProduct(product);

    return updateProductDB(
        id,
        product.name.trim(),
        product.price,
        product.stock,
        product.category_id
    );
};

export const deleteProductService = async (id) => {
    await getProductById(id);
    await deleteProductDB(id);
};

const validateProduct = ({ name, price, stock }) => {
    if (typeof name !== "string" || name.trim().length < 2) {
        const err = new Error("Tên sản phẩm phải có ít nhất 2 ký tự");
        err.statusCode = 400;
        throw err;
    }

    if (typeof price !== "number" || price <= 0) {
        const err = new Error("Giá sản phẩm phải là số và lớn hơn 0");
        err.statusCode = 400;
        throw err;
    }

    if (stock !== undefined && (!Number.isInteger(stock) || stock < 0)) {
        const err = new Error("Số lượng tồn kho phải lớn hơn hoặc bằng 0");
        err.statusCode = 400;
        throw err;
    }
};