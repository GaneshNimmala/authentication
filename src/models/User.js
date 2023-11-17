import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Session from "./models/Session";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  sessionID: { type: String, default: null },
});

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("sessionID")) {
    const newSessionID = generateUniqueSessionID();
    this.sessionID = newSessionID;

    // Create or update session for the current device
    const session = await Session.findOne({ userId: this._id });
    if (!session) {
      await new Session({
        userId: this._id,
        deviceId: req.headers["device-id"],
        isActive: true,
      }).save();
    } else {
      session.deviceId = req.headers["device-id"];
      session.isActive = true;
      await session.save();
    }
  }

  next();
});

const generateUniqueSessionID = () => {
  // Implement logic to generate a unique session ID
  const randomBytes = crypto.randomBytes(16).toString("hex");
  const timestamp = Date.now().toString(36);
  const sessionID = `${randomBytes}-${timestamp}`;
  return sessionID;
};

const User = mongoose.model("User", userSchema);

export { User };
