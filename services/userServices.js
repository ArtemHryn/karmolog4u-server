const { User } = require("../models/userModel");

// for admin

const getUsers = async () => {
  const users = await User.find({}, { password: 0 });
  return users;
};

const getUserById = async (id) => {
  const user = await User.findOne({ _id: id }, { password: 0 });
  return user;
};

const updateCredentialsById = async (id, body) => {
  const user = await User.findByIdAndUpdate(id, { $set: body });
  return user;
};

// for user

const updateAvatarById = async (user, avatarUrl) => {
  const updateUser = await User.findByIdAndUpdate(user._id, { $set: {avatarUrl} });
  return updateUser;
};

const updateCredentials = async (user, body) => {
const updateUser = await User.findByIdAndUpdate(user._id,{$set:body})
  return updateUser;
};

module.exports = {
  updateAvatarById,
  getUsers,
  getUserById,
  updateCredentials,
  updateCredentialsById,
};
