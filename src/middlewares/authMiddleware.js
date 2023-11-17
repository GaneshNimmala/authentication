const jwt = require("jsonwebtoken");

exports.requireLogin = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;

    // Check if user has an active session on another device
    const activeSession = await Session.findOne({
      userId,
      deviceId: { $ne: req.headers["device-id"] },
      isActive: true,
    });

    if (activeSession) {
      return res
        .status(400)
        .send({ message: "Already logged in on another device" });
    }

    // Create or update session for the current device
    const session = await Session.findOne({ userId });
    if (!session) {
      await new Session({
        userId,
        deviceId: req.headers["device-id"],
        isActive: true,
      }).save();
    } else {
      session.deviceId = req.headers["device-id"];
      session.isActive = true;
      await session.save();
    }

    // Proceed to next middleware or route handler
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};
