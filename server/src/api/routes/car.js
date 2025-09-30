const express = require("express")
const { isLoggedIn } = require("../../middlewares/isLoggedIn")
const { addVehicle, myCars, allCars} = require("../controllers/car")
const { validateVehicle } = require("../../middlewares/validateVehicle")
const { checkVehicleDuplicate } = require("../../middlewares/checkVehicleDuplicate")
const { fetchVehicleSpec } = require("../../middlewares/fetchVehicleSpec")
const { fetchVehicleImages } = require("../../middlewares/fetchVehicleImages")


const routerCars = express.Router()

routerCars.post("/add", isLoggedIn, validateVehicle, checkVehicleDuplicate , fetchVehicleSpec , fetchVehicleImages , addVehicle)
routerCars.get("/myCars", isLoggedIn, myCars)
routerCars.get("/allCars", allCars)


module.exports = routerCars