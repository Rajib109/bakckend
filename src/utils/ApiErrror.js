class ApiError extends Error {
    constructor(message, statusCode, errors = [], statck) {
        super(message);
        this.errors = errors; // Array to hold validation errors or other error details
        this.data = null;
        this.message = message;
        this.success = false; // Indicates whether the operation was successful
        this.statusCode = statusCode;
        this.name = this.constructor.name; // Set the error name to the class name
        if (statck) {
            this.stack = statck; // Include the stack trace if provided
        } else {
            Error.captureStackTrace(this, this.constructor); // Capture the stack trace
        }
    }
}

export { ApiError };