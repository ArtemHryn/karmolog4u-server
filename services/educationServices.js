const { ErrorConstructor } = require("../helpers/errors");
const { Education } = require("../models/educationModel");

const addEducation = async (body) => {
  if (!body.price || !body.name) {
    throw new ErrorConstructor(400, "price or name doesn't exist");
  }
  if (body.price.length !== 2) {
    throw new ErrorConstructor(400, "price must have 2 values");
  }
  const education = new Education(body);
  await education.save();
};

module.exports = { addEducation };
