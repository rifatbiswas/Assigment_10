const express = require("express")
const App = express.Router();

//controller

const {GetProduct} = require ("../controllers/product.js")


//Routes........

App.post("/products", GetProduct);





module.exports = App;