const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: [true, "Token is required"],
      expires: "1h",
      unique: true,
    },
    refreshToken: {
      type: String,
      required: [true, "First name is required"],
      expires: "30m",
      unique: true,
    },
    deviceId: {
      type: String,
      required: [true, "Device id is required"],
      unique: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Token = mongoose.model("Token", tokenSchema);

module.exports = {
  Token,
};
