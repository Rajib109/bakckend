const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
            .catch((error) => next(error)); // Pass the error to the next middleware
    };
};


export { asyncHandler };
// This utility function wraps an asynchronous function and catches any errors that occur,
// passing them to the next middleware in the Express.js error handling chain.
// It allows for cleaner code by avoiding repetitive try-catch blocks in route handlers.


// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(req, res, next);
//     } catch (error) {
//         res.status({
//             success: false,
//             message: error.message || 'Internal Server Error',
//             error: error
//         });
//         next(error); // Pass the error to the next middleware for handling
//     }
// };
