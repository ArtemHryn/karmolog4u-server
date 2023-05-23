const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../../helpers/apiHelpers");
const {
  userLoginValidation,
  userRegisterValidation,
} = require("../../middleware/validationMiddleware");
const {
  registerUserController,
  loginUserController,
  logoutUserController,
  currentUserController,
  refreshTokenController,
} = require("../../controllers/authControllers");
const { authMiddleware } = require("../../middleware/authMiddleware");
const { currentMiddleware } = require("../../middleware/currentMiddleware");

router.post(
  "/register",
  userRegisterValidation,
  asyncWrapper(registerUserController)
);
router.post("/login", userLoginValidation, asyncWrapper(loginUserController));
router.post("/logout", authMiddleware, asyncWrapper(logoutUserController));

router.get("/current", currentMiddleware, asyncWrapper(currentUserController));
router.get(
  "/refresh-token",
  authMiddleware,
  asyncWrapper(refreshTokenController)
);

module.exports = router;
