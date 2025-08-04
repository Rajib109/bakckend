class Apiresponse {
    constructor(StatusCode, message="Success", data) {
        this.StatusCode = StatusCode;
        this.message = message;
        this.data = data;
        this.success = StatusCode < 400; // Indicates whether the operation was successful
    }
}

export { Apiresponse };