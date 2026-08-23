export const notFoundHandler = (req, res, next) => {
    const error = new Error(`Khong tim thay: ${req.originalUrl} - ${req.method}`);
    error.status = 404;
    next(error);
};

export const errorHandler = (err, req, res, next) => {
    const statusCode = err.status || 500;
    const message = err.message || 'Internal Server Error';

    console.error(`[ERROR] ${statusCode} - ${req.method} ${req.url} - ${message}`);
    if (statusCode === 500) {
        console.error(err.stack);
    }

    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error',
        data: null
    });
}