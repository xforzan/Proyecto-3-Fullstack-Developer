const express = require("express")
const { logIn } = require("../controllers/user")

const routerUsers = express.Router()

routerUsers.get("/", logIn)

module.exports = { routerUsers } 