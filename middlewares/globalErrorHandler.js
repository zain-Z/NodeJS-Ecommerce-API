export const globalErrorHandler = (err, req, res, next) => {
    //stack
    //message
    const stack = err?.stack;
    const message = err?.message;
    const statusCode = err?.statusCode ? err.statusCode : 500;
    res.status(statusCode).json({
        stack,
        message,
    })
};

// 404 error handler
export const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};
