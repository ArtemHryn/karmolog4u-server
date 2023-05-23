const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel");
const { ErrorConstructor } = require("../helpers/errors");
const { Token } = require("../models/tokenModel");

const authMiddleware = async (req, res, next) => {
  if (!req.cookies.tokenJWT || !req.cookies.refreshToken || !req.cookies.device_Id) {
    next(new ErrorConstructor(401, "Unauthorized"));
  }
  const token = req.cookies.tokenJWT;
  const refreshToken = req.cookies.refreshToken;
  const deviceId = req.cookies.device_Id;
  try {
    const userReq = jwt.verify(token, process.env.JWT_SECRET);
    const { id } = userReq;
    const tokenDb = await Token.findOne({ deviceId, owner: id });
    if (
      !tokenDb ||
      tokenDb.token !== token ||
      tokenDb.refreshToken !== refreshToken
      ) {
        next(new ErrorConstructor(401, "Unauthorized"));
      }

    const user = await User.findById(id, {
      createdAt: 0,
      updatedAt: 0,
      password:0
    });
    req.user = user;
    next();
  } catch (error) {
    next(new ErrorConstructor(401, "Unauthorized"));
  }
};

module.exports = {
  authMiddleware,
};
