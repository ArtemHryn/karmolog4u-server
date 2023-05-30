// add Education

const { addEducation } = require("../services/educationServices");

const addEducationController = async (req, res) => {
  await addEducation(req.body);
  res.status(201).json({ message: "Added" });
};

module.exports = {
  addEducationController,
};
