const express = require('express');
const router = express.Router();

const userController = require("../controllers/userController");

// Routes path for each user database controllers
router.post("/auth", userController.authenticationPageAccess);
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/token", userController.tokenRefresh);
router.delete("/logout", userController.logoutUser);
router.get("/name", userController.authenticationUser, userController.getUsername);


module.exports = router;