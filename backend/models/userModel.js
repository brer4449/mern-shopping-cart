const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
// method to check if passwords match, enteredPassword is going to be plain text, need to use bcrypt since password stored in DB is hashed
userSchema.methods.matchPassword = async function (enteredPassword) {
  // bcrypt has function called compare. comparing enteredPassword to the password in our User model, calling matchPassword on specific user, so have access to all fields in schema
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
