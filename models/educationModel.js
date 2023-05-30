const { Schema, model } = require("mongoose");

const educationShema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: Array,
    },
    lessons: {
      type: Array,
      required: true,
    },
    price: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Education = model("education", educationShema);

module.exports = {
  Education,
};
