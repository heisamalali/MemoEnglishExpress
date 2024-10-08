class ApiResponse{
    constructor(error,message,data,req) {
       this.error = error;
       this.message = message;
       this.data = data;
       this.req = req;
    }
}

module.exports = ApiResponse