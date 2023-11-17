const expressRateLimit = require("express-rate-limit");

const rateLimiter = expressRateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit to 100 requests per window
  message: "Too many requests from this IP, please try again later.",
});

exports.limitRequests = (route) => {
  return (req, res, next) => {
    rateLimiter(req, res, next);
  };
};
