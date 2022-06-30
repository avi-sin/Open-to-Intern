const mongoose = require("mongoose");  // --> mongoose module is imported
const objectId = mongoose.Schema.Types.ObjectId  // --> syntax to refer an objectId to a key in schema

// to define a format (schema) for creating an intern in the database
const internSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
      trim:true
    },
    collegeId: {
        type: objectId,
        ref: "College",
        trim:true
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  }
  // { timestamps: true }
);


module.exports = mongoose.model("Intern", internSchema);  // --> mongoose creates the model using the schema