const express = require("express")
const App = express.Router();

const {register, login} = require ("../controllers/user.js")

App.post("/register", register);
App.post("/login", login);






module.exports = App;