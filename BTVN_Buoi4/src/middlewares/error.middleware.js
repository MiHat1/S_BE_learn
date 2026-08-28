//loi not found 404
export const notFoundHandler = (req, res, next) => {
    const error = new Error(`Not Found: ${req.originalUrl} - ${req.method}`);
    error.statusCode = 404;
    next(error);
};

//loi conflict 409
export const conflictHandler = (req, res, next) => {
    const error = new Error(`Conflict: ${req.originalUrl} - ${req.method}`);
    error.status = 409;
    next(error);
};

//loi 403 :forbidden
export const forbiddenHandler = (req, res, next) => {
    const error = new Error(`Forbidden: ${req.originalUrl} - ${req.method}`);
    error.status = 403;
    next(error);
};

//loi 400 : bad request
export const badRequestHandler = (req, res, next) => {
    const error = new Error(`Bad Request: ${req.originalUrl} - ${req.method}`);
    error.status = 400;
    next(error);
};
 
//loi 500 :internal server error
export const errorHandler = (err, req, res, next) => {
    const statusCode = err.status || 500;
    const message = err.message || 'Internal Server Error';

    console.error(`[ERROR] ${statusCode} - ${req.method} ${req.url} - ${message}`);
    if (statusCode === 500) {
        console.error(err.stack);
    }

    res.status(statusCode).json({
        success: false,
        statusCode: statusCode || '500' ,
        message: err.message || 'Internal Server Error',
        data: null
    });
}