import express from "express";
import helmet from "helmet";
const rateLimiterMiddleware = require("./middlewares/rateLimiterMiddleware");
const app = express();

// Connect to MongoDB Atlas database
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://ganeshnimmala:Ganesh123@database-cluster-authce.wbrvlwn.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connected to MongoDB database");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

connectDB();

app.use(rateLimiterMiddleware.limitRequests);
app.use(errorHandlerMiddleware);
