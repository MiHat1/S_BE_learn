// - requireAdminRole (src/middlewares/auth.middleware.js): Bắt lỗi 403 Forbidden nếu Header x-role không phải là 'admin'.

export const requireAdminRole = (req, res, next) => {
    const roleHeader = req.get('x-role');

    //neu khong truyen hoac truyen sai => chan
    if (!roleHeader || roleHeader !== 'admin') {
        const error = new Error("khong phai la tai khoan admin");
        error.status = 403;
        return next(error);
    }
    console.log("Hop le - cho phep di tiep");
    next();
}