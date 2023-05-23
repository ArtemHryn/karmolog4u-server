const { ErrorConstructor } = require("../helpers/errors");
const {
  registerUser,
  loginUser,
  logoutUser,
  currentUser,
} = require("../services/authServices");

const registerUserController = async (req, res) => {
  const { body } = req;
  try {
    await registerUser(body);
    res.status(201).json({ message: "successful" });
  } catch (error) {
    throw new ErrorConstructor(409, "User is already registered");
  }
};

const loginUserController = async (req, res) => {
  const { body } = req;
  const device = req?.cookies.device_Id;
  try {
    const { token, refreshToken, deviceId, userData } = await loginUser(
      body,
      device
    );
    res.cookie("tokenJWT", token, {
      httpOnly: true,
      // secure: true,
      maxAge: 60 * 60 * 1000,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      // secure: true,
      maxAge: 15 * 60 * 1000,
    });
    res.cookie("device_Id", deviceId, {
      httpOnly: true,
      // secure: true,
    });
    res.json({ user: userData });
  } catch (error) {
    throw new ErrorConstructor(error.status, error.message);
  }
};

const logoutUserController = async (req, res) => {
  const deviceId = req.cookies.device_Id;
  const { _id: id } = req.user;
  console.log(id);
  try {
    await logoutUser(deviceId, id);
    res.clearCookie("tokenJWT");
    res.clearCookie("refreshToken");
    res.status(204).json({ message: "successful" });
  } catch (error) {
    throw new ErrorConstructor(409, "User is not logged in");
  }
};

const currentUserController = async (req, res) => {
  const deviceId = req.cookies.device_Id;
  const user = req.user;
  try {
    const { token, refreshToken } = await currentUser(user, deviceId);
    res.cookie("tokenJWT", token, {
      httpOnly: true,
      // secure: true,
      maxAge: 60 * 60 * 1000, // 1 hour
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      // secure: true,
      maxAge: 15 * 60 * 1000, // 15 min
    });
    res.json({ user });
  } catch (error) {
    throw new ErrorConstructor(409, "Unauthorized");
  }
};

const refreshTokenController = async (req, res) => {
  const deviceId = req.cookies.device_Id;
  const user = req.user;
  try {
    const { token, refreshToken } = await currentUser(user, deviceId);
    res.cookie("tokenJWT", token, {
      httpOnly: true,
      // secure: true,
      maxAge: 60 * 60 * 1000, // 1 hour
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      // secure: true,
      maxAge: 15 * 60 * 1000, // 15 min
    });
    res.json({ message: "successful" });
  } catch (error) {
    throw new ErrorConstructor(409, "Unauthorized");
  }
};

module.exports = {
  registerUserController,
  loginUserController,
  logoutUserController,
  currentUserController,
  refreshTokenController,
};
