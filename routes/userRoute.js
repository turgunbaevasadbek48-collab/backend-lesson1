const { Router } = require("express");
const users = Router();
const { postRegister, getUsers, getUserById, updateUser, deletUser } = require("../controllers/users.controller");

users.post("/register", postRegister);
users.get("/getUsers", getUsers);
users.get("/getUserById/:id", getUserById);
users.put("/updateUser/:id", updateUser);
users.delete("/deletUser/:id", deletUser);

module.exports = { users };