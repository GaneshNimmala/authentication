const errorHandlerMiddleware = (err, req, res, next) => {
  console.error(err);

  if (err.name === "ValidationError") {
    res.status(400).send({ message: err.message });
  } else if (err.name === "JsonWebTokenError") {
    res.status(401).send({ message: "Invalid JWT token" });
  } else {
    res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = errorHandlerMiddleware;
