const Interceptor = require("express-interceptor");

class DataValidationInterceptor extends Interceptor {
  async intercept(req, res) {
    // Perform data validation
    const { username, email } = req.body;

    if (!username || !email) {
      throw new Error("Missing required fields");
    }

    // Allow request to proceed if validation is successful
    next();
  }
}

const dataValidationInterceptor = new DataValidationInterceptor();

module.exports = dataValidationInterceptor;
