const path = require("path");
const jwt = require("jsonwebtoken");
const fireBaseAdmin = require("firebase-admin");
const User = require("../models/userModel");
const AppError = require("../ultils/AppError");
const catchAsync = require("../ultils/catchAsync");
fireBaseAdmin.initializeApp({
  credential: fireBaseAdmin.credential.cert(
    require(path.join(__dirname, "credentials.json"))
  ),
});

const validateFirebaseToken = async (token) => {
  try {
    const decodedToken = await fireBaseAdmin.auth().verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    throw new AppError(401, "Invalid Firebase token");
  }
};

const signToken = (idUser) => {
  return jwt.sign({ idUser }, process.env.SECRET_KEY, {
    expiresIn: "5d",
  });
};

const logInAndSendUserWithToken = (res, user, statusCode) => {
  const token = signToken(user._id);
  const cookieOption = {
    // secure: process.env.NODE_ENV === "production",
    secure:true,
    httpOnly: true,
    sameSite: "none",
    domain: ".onrender.com",
    expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
  };
  res.cookie("jwt", token, cookieOption);
  return res.status(statusCode).json({
    status: "success",
    token,
    data: user,
  });
};

exports.signUp = catchAsync(async (req, res) => {
  const {
    name,
    email,
    password,
    passwordConfirm,
    role,
    userPicture,
    jwtByGoogle,
    signInWithGoogle,
  } = req.body;
  const user = await User.findOne({ email }).select(
    "password name email userPicture role"
  );
  if (signInWithGoogle) {
    res.cookie("jwt", jwtByGoogle, {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    });
    if (!user) {
      const newUser = await User.create({
        name,
        email,
        password: password || "signInWithGoogle",
        passwordConfirm: passwordConfirm || "signInWithGoogle",
        userPicture,
      });
      return res.status(200).json({
        status: "success",
        data: {
          name: newUser.name,
          email: newUser.email,
          password: newUser.password,
          userPicture: newUser.userPicture,
          role: newUser.role,
          signInWithGoogle: true,
        },
        token: jwtByGoogle,
      });
    } else {
      return res.status(200).json({
        status: "success",
        data: {
          name: user.name,
          email: user.email,
          role: user.role || "user",
          userPicture: user.userPicture,
          signInWithGoogle: true,
        },
        token: jwtByGoogle,
      });
    }
  } else {
    const newUser = await User.create({
      name,
      email,
      password: password || "signInWithGoogle",
      passwordConfirm: passwordConfirm || "signInWithGoogle",
      role,
      userPicture,
    });
    logInAndSendUserWithToken(res, newUser, 200);
  }
});

exports.signIn = catchAsync(async (req, res) => {
  const {
    name,
    email,
    role,
    password,
    userPicture,
    jwtByGoogle,
    signInWithGoogle,
  } = req.body;
  const user = await User.findOne({ email }).select(
    "password name email userPicture role"
  );
  if (signInWithGoogle) {
    res.cookie("jwt", jwtByGoogle, {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    });
    if (!user) {
      await User.create({
        name,
        email,
        role,
        password: "signInWithGoogle",
        userPicture,
      });
      return res.status(200).json({
        status: "success",
        data: {
          name,
          email,
          role: role || "user",
          userPicture,
          signInWithGoogle: true,
        },
        token: jwtByGoogle,
      });
    }
    if (user) {
      return res.status(200).json({
        status: "success",
        data: {
          name: user.name,
          email: user.email,
          role: user.role || "user",
          userPicture: user.userPicture,
          signInWithGoogle: true,
        },
        token: jwtByGoogle,
      });
    }
  } else {
    if (!user) throw new AppError(404, "Email is not exist!");
    const correctPassword = await user.correctPassword(password || "");
    if (!correctPassword) throw new AppError(404, "Incorrect password");
    logInAndSendUserWithToken(res, user, 200);
  }
});

exports.signOut = catchAsync(async (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({
    status: "success",
    message: "Sign out successfully",
    data: null,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token = "";
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  )
    token = req.headers.authorization.split(" ")[1];
  else if (req.cookies.jwt) token = req.cookies.jwt;
  if (!token) throw new AppError(400, "Please log in to continue !");
  try {
    // Kiểm tra token Firebase
    const firebaseDecoded = await validateFirebaseToken(token);
    const currentUser = await User.findOne({ email: firebaseDecoded.email });
    if (!currentUser)
      throw new AppError(
        404,
        "The token belonging to this user is no longer available!"
      );
    req.user = currentUser;
    next();
  } catch (firebaseError) {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const currentUser = await User.findById(decoded.idUser);
    if (!currentUser)
      throw new AppError(
        404,
        "The token belonging to this user is no longer available!"
      );
    req.user = currentUser;
    next();
  }
});

exports.authority = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      throw new AppError(401, "You don't have permisson to perfom this action");
    next();
  };
};
