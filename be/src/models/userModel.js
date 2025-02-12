const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  userPicture: {
    type: String,
    default: "",
  },
  role: { type: String, default: "user" },
  password: {
    type: String,
    select: false,
  },
  passwordConfirm: String,
});
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});
userSchema.methods.correctPassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};
const User = mongoose.model("User", userSchema);
module.exports = User;
