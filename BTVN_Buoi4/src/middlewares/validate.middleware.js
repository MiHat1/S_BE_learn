// - validateCreateProduct (src/middlewares/validate.middleware.js): Bắt lỗi 400 Bad Request nếu req.body thiếu name hoặc price.

export const validateCreateProduct = (req, res, next) => {
    const { price, name } = req.body;
    if (!name || price === null || price === undefined || price <= 0) {
        const error = new Error("thieu name hoac price khong hop le");
        error.status = 400;
        return next(error);
    }
    //hop le => pass
    next();
}