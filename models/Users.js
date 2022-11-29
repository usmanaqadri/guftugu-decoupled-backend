const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// CREATE SCHEMA

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  myGroups: [{ type: String }],
  myEvents: [{ type: String }],
});

// Gotta set up some bcrypt stuff to not actually store the real password!

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("Incorrect Password");
  }
  throw Error("Incorrect Email");
};

// CREATE MODEL

const User = mongoose.model("User", UserSchema);

module.exports = User;
