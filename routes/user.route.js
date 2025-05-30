const express = require("express");
const route = express.Router();

const { createUser, loginUser, getUsers, getUser, updateUser, deleteUser } = require("../controllers/user.controller");

route.post("/create-user", createUser);
route.post("/login", loginUser);

route.get("/get-users", getUsers);
route.get("/get-user", getUser);

route.put("/update-user", updateUser);

route.delete("/delete-user/:id", deleteUser);

module.exports = route;