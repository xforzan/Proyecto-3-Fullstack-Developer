const express = require("express")
require("dotenv").config();

const { routerUsers } = require("./src/api/routes/user")

const app = express()

const PORT = process.env.PORT

app.listen(PORT)
console.log(`Escuchando en http://localhost:${PORT}`)

app.use("/api/v1/users", routerUsers)