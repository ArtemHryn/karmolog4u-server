const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("../models/userModel");
const { Token } = require("../models/tokenModel");
const { ErrorConstructor } = require("../helpers/errors");
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");

const secret = process.env.JWT_SECRET;

const registerUser = async (body) => {
  const user = new User({ ...body });
  await user.save();
  return user.email;
};

const loginUser = async (body, deviceId) => {
  const user = await User.findOne({ email: body.email });
  if (!user) {
    throw new ErrorConstructor(404, "User not found");
  }
  const decodePassword = await bcrypt.compare(body.password, user.password);
  if (!decodePassword) {
    throw new ErrorConstructor(401, "Incorrect password");
  }
  const token = jwt.sign({ id: user._id, email: user.email }, secret);
  const refreshToken = randomTokenString();
  const { firstName, lastName, email, banned, role, avatarUrl, phone,_id } = user;
  const userData = {
    _id,
    firstName,
    lastName,
    email,
    banned,
    role,
    avatarUrl,
    phone,
  };
  const tokenDb = await Token.findOne({ deviceId, owner: user._id });
  console.log(tokenDb);
  if (!deviceId || !tokenDb) {
    console.log('create new');
    const deviceId = uuidv4();
    const newToken = new Token({
      token,
      refreshToken,
      deviceId,
      owner: user._id,
    });
    await newToken.save();
    return { token, refreshToken, deviceId, userData };
  }
  tokenDb.token = token
  tokenDb.refreshToken = refreshToken
  await tokenDb.save()
  return { token, refreshToken, deviceId, userData };
};

const logoutUser = async (deviceId, id) => {
   await Token.findOneAndUpdate(
    { deviceId, owner:id },
    { $set: { token: "null", refreshToken: "null" } }
  );
};

const currentUser = async (user, deviceId) => {
  const token = jwt.sign({ id: user._id, email: user.email }, secret);
  const refreshToken = randomTokenString();
  await Token.findOneAndUpdate(
    { deviceId, owner: user.id },
    { $set: { token, refreshToken } }
  );
  return { token, refreshToken };
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  currentUser,
};

function randomTokenString() {
  return crypto.randomBytes(40).toString("hex");
}
