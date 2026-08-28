import {
    findProductsFromDB,
    findProductByIdFromDB,
    findProductByNameFromDB,
    createProductInDB,
} from '../repositories/product.data.js';

export const getAllProductsService = async ({ category, maxPrice } = {}) => {
    // - getAllProducts({ category, maxPrice }): Lọc sản phẩm theo danh mục hoặc giá tối đa.

    const products = await findProductsFromDB();

    //chuẩn hóa category
    const filterCategory = category?.trim().toLowerCase();

    //nếu có maxPrice
    if (maxPrice !== undefined && maxPrice !== '') {
        maxPrice = Number(maxPrice)
    }

    //nem loi maxPrice k ph so hoac <0
    if (Number.isNaN(maxPrice) || maxPrice < 0) {
        const error = new Error('maxPrice khong hop le');
        error.statusCode = 400;
        throw error;
    }
    return products.filter((product) => {
        const matchCategory = !filterCategory || product.category.toLowerCase() === filterCategory;

        const matchMaxPrice = maxPrice === undefined || maxPrice === '' ? true : product.price <= maxPrice;

        return matchCategory && matchMaxPrice;
    });
};

export const getProductByIdService = async (id) => {
    //Xu ly id khong hop le 
    if (isNaN(id) || id <= 0) {
        const error = new Error('Id khong hop le');
        error.statusCode = 400;
        throw error;
    }

    //Xu ly neu k tim thay san pham
    const product = await findProductByIdFromDB(id);
    if (!product) {
        const error = new Error('San Pham khong ton tai');
        error.statusCode = 404;
        throw error;
    }
    return product;
}

export const createProductService = async ({ name, price, category, inStock }) => {
    // Xu ly them trung san pham
    const existingProduct = await findProductByNameFromDB(name);
    if (existingProduct) {
        const error = new Error('San Pham da ton tai');
        error.statusCode = 409;
        throw error;
    }

    //Xu ly gia san pham < 0
    if (price <= 0) {
        const error = new Error('Gia san pham khong hop le');
        error.statusCode = 400;
        throw error;
    }

    // Tạo sản phẩm mới
    const newProduct = await createProductInDB({ name, price, category, inStock });
    return newProduct;
}
