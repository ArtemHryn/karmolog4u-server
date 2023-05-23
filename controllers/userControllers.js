const { ErrorConstructor } = require("../helpers/errors");
const {
  updateAvatarById,
  getUsers,
  getUserById,
  updateCredentials,
  updateCredentialsById,
} = require("../services/userServices");

// for admin

const getUsersController = async (req, res) => {
  try {
    const users = await getUsers();
    res.json({ users });
  } catch (error) {
    throw new ErrorConstructor(400, "Something wrong( Try again");
  }
};

const getUserByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getUserById(id);
    res.json({ user });
  } catch (error) {
    throw new ErrorConstructor(404, `User with ${id} not found`);
  }
};

const updateCredentialsByIdController = async (req, res) => {
  const { body } = req;
  const { id } = req.params;
  try {
    await updateCredentialsById(id, body);
    res.json({ message: "successful" });
  } catch (error) {
    throw new ErrorConstructor(403, "Does not have access");
  }
};

// for user

const updateAvatarController = async (req, res) => {
  const avatarUrl = req.file.path;
  const { user } = req;
  if (!avatarUrl) {
    throw new ErrorConstructor(400, "Missing required field ");
  }
  try {
    await updateAvatarById(user, avatarUrl);
    res.json({ message: "successful" });
  } catch (error) {
    throw new ErrorConstructor(400, "Something wrong( Try again");
  }
};

const updateCredentialsController = async (req, res) => {
  const { body, user } = req;
  try {
    await updateCredentials(user,body);
    res.json({ message: "successful" });
  } catch (error) {
    throw new ErrorConstructor(400, "Something wrong( Try again");
  }
};

module.exports = {
  getUserByIdController,
  getUsersController,
  updateCredentialsController,
  updateCredentialsByIdController,
  updateAvatarController,
};
