const express = require("express")
const { isLoggedIn } = require("../../middlewares/isLoggedIn")
const { myUser, deleteMyUser, avatar} = require("../controllers/user")
const upload = require("../../middlewares/file")

const routerUsers = express.Router()

routerUsers.get("/me", isLoggedIn, myUser)
routerUsers.post("/avatar", isLoggedIn, upload.single("avatar") , avatar)
routerUsers.delete("/me", isLoggedIn, deleteMyUser)


module.exports = routerUsers