const express = require("express");
const route = express.Router();

const { createUser, loginUser, getUsers, getUser, updateUser, deleteUser } = require("../controllers/user.controller");

// post request
route.post("/create-user", createUser);
route.post("/login", loginUser);

// get request
route.get("/get-users", getUsers);
route.get("/get-user", getUser);

// put request
route.put("/update-user", updateUser);

// delete request
route.delete("/delete-user/:id", deleteUser);

module.exports = route;