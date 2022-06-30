const mongoose = require("mongoose");  // --> mongoose module is imported

// to define a format (schema) for creating a college in the database
const collegeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true
    },
    fullName: {
      type: String,
      required: true,
      trim:true
    },
    logoLink: {
      type: String,
      required: true,
      trim:true
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  }
  // { timestamps: true }
);

module.exports = mongoose.model("College", collegeSchema);  // --> mongoose creates the model using the schema
