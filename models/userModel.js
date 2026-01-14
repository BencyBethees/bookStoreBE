const mongoose = require("mongoose"); //importing mongoose 1

//created a schema             2
//rules for a model is schema
const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  proPic: {
    type: String,
    default: "",
  },
  userType: {
    type: String,
    default: "user",
  },
  bio: {
    type: String,
    default: "",
  },
});

//model creation 3
const userModel = mongoose.model("users", userSchema);

//exporting one
module.exports = userModel;
