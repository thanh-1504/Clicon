const User = require("../models/userModel");
const catchAsync = require("../ultils/catchAsync");
const bcrypt = require("bcryptjs");
exports.updateUser = catchAsync(async (req, res) => {
  let { userPhoto, displayName, email, password } = req.body;
  if (password) password = await bcrypt.hash(password, 12);
  const currentUser = await User.findById(req.user._id).select("+password");
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      name: displayName || currentUser.name,
      email: email || currentUser.email,
      userPicture: userPhoto || currentUser.userPicture,
      password: password || currentUser.password,
    },
    { new: true }
  );
  res.status(200).json({
    status: "Success",
    data: user,
  });
});

exports.editUser = catchAsync(async (req, res) => {
  let { userPhoto, displayName, email, password } = req.body;
  if (password) password = await bcrypt.hash(password, 12);
  const currentUser = await User.findById(req.params.userId).select(
    "+password"
  );
  const user = await User.findByIdAndUpdate(
    req.params.userId,
    {
      name: displayName || currentUser.name,
      email: email || currentUser.email,
      userPicture: userPhoto || currentUser.userPicture,
      password: password || currentUser.password,
    },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    data: user,
  });
});

exports.createUser = catchAsync(async (req, res) => {
  const { name, email, password, userPicture } = req.body;
  const newUser = await User.create({ name, email, password, userPicture });
  res.status(201).json({
    status: "success",
    data: newUser,
  });
});

exports.getUser = catchAsync(async (req, res) => {
  const user = await User.findById(req.body.userId);
  res.status(200).json({
    status: "success",
    data: user,
  });
});

exports.getAllUsers = catchAsync(async (req, res) => {
  const allUsers = await User.find();
  res.status(200).json({
    status: "success",
    result: allUsers.length,
    data: allUsers,
  });
});

exports.deleteUser = catchAsync(async (req, res) => {
  await User.findByIdAndDelete(req.params.idUser);
  res.status(200).json({
    status: "success",
    data: null,
  });
});
