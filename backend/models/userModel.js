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

// before we save want to encrypt password by adding middleware
userSchema.pre("save", async function (next) {
  // only want to do this if the password field is sent or modified (this is apart of mongoose CHECK THE DOCS)
  // this check prevents a new salt/hash from being generated if we modify only the email or name and NOT the password
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  // resetting this.password to be the hashed password
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
