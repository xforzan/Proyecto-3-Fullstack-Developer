const express = require("express")
const { isLoggedIn  }= require("../../middlewares/isLoggedIn")
const { scheduleAppointment, userAppointments, cancelAppointment } = require("../controllers/appointment")

const routerAppointment = express.Router()

routerAppointment.post("/", isLoggedIn, scheduleAppointment )
routerAppointment.get("/user", isLoggedIn, userAppointments)
routerAppointment.delete("/:eventId", isLoggedIn, cancelAppointment)

module.exports =  routerAppointment 