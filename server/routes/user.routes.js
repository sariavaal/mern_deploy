const express = require("express");

const userController = require("../controllers/user.controller");

const UserRouter = express.Router();

//api/auth

UserRouter.post("/login", userController.login);
UserRouter.post("/register", userController.createUser);
UserRouter.get("/logout", userController.logout);

module.exports = UserRouter;

