const express = require("express");
const Router = express.Router();

const auth = require("../middleware/auth");
const UserCtrl = require("../controllers/user");

Router.post("/user", UserCtrl.createUser);
Router.get("/users", UserCtrl.getUsers);
Router.post("/login", UserCtrl.login);
Router.get("/profile", auth, UserCtrl.getProfile);

Router.get("/users/:id", UserCtrl.getSingleUser);

module.exports = Router;