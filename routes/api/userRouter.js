const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../../helpers/apiHelpers");
const {
  updateAvatarController,
  updateCredentialsController,
  getUsersController,
  getUserByIdController,
  updateCredentialsByIdController,
} = require("../../controllers/userControllers");
const {
  userCredentialsValidation,
  userCredentialsByIdValidation,
} = require("../../middleware/validationMiddleware");
const { authMiddleware } = require("../../middleware/authMiddleware");
const { roleMiddleware } = require("../../middleware/RoleMiddleware");

// for user

router.patch(
  "/avatars",
  authMiddleware,
  // uploadMiddleware.single("avatar"),     upload middleware
  asyncWrapper(updateAvatarController)
);
router.patch(
  "/credentials",
  authMiddleware,
userCredentialsValidation,
  asyncWrapper(updateCredentialsController)
);

// for admin

router.get(
  "/",
  authMiddleware,
  roleMiddleware,
  asyncWrapper(getUsersController)
);
router.get(
  "/:id",
  authMiddleware,
  roleMiddleware,
  asyncWrapper(getUserByIdController)
);
router.patch(
  "/credentials/:id",
  authMiddleware,
  roleMiddleware,
  userCredentialsByIdValidation,
  asyncWrapper(updateCredentialsByIdController)
);

module.exports = router;
