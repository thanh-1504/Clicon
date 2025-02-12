const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const router = express.Router();
router.post("/signup", authController.signUp);
router.post("/signin", authController.signIn);
router.get("/signout", authController.signOut);

router.post("/update-user", authController.protect, userController.updateUser);
router.post(
  "/edit-user/:userId",
  authController.protect,
  authController.authority("ADMIN"),
  userController.editUser
);
router.post(
  "/create-user",
  authController.protect,
  authController.authority("ADMIN"),
  userController.createUser
);
router.get(
  "/all-users",
  authController.protect,
  authController.authority("ADMIN"),
  userController.getAllUsers
);
router.get(
  "/get-user",
  authController.protect,
  authController.authority("ADMIN"),
  userController.getUser
);
router.post(
  "/delete-user/:idUser",
  authController.protect,
  authController.authority("ADMIN"),
  userController.deleteUser
);
module.exports = router;
