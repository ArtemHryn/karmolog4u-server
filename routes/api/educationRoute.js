const express = require("express");
const { addEducationController } = require("../../controllers/educationController");
const { asyncWrapper } = require("../../helpers/apiHelpers");

const router = express.Router();


router.post("/", asyncWrapper(addEducationController));

module.exports = router;