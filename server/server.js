require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { connectDB } = require("./src/config/db");
const { connectCloudinary } = require("./src/config/cloudinary");
const { isLoggedIn } = require("./src/middlewares/isLoggedIn");

const routerUsers = require("./src/api/routes/user");
const routerAuth = require("./src/api/routes/auth");
const routerCars = require("./src/api/routes/car")
const routerAppointment = require("./src/api/routes/appointment")

connectCloudinary();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(cookieParser());

app.use("/api/v1/users", routerUsers);
app.use("/api/v1/auth", isLoggedIn, routerAuth);
app.use("/api/v1/cars", routerCars)
app.use("/api/v1/appointment", routerAppointment)
app.use("/", (req, res) => {
  res.send("Funcionando correctamente");
});

app.listen(PORT, () => {
  console.log(`Escuchando en http://localhost:${PORT}`);
});


