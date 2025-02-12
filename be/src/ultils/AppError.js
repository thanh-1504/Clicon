class AppError extends Error {
  constructor(statusCode, message) {
    super(message),
      (this.statusCode = statusCode),
      (this.status = `${statusCode}`.startsWith("5") ? "error" : "fail");
    this.isOperational = true;
  }
}
module.exports = AppError;
