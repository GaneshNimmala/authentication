exports.logRequest = (req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
};
