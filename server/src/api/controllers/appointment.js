const { calendar, calendarId, timeZone } = require("../../config/calendar");
const Vehicle = require("../models/Vehicle");
const User = require("../models/User");

const scheduleAppointment = async (req, res) => {
  try {
    const { isLoggedIn } = req;
    if (!isLoggedIn) {
      return res.status(401).json({ message: "No estás autenticado" });
    }

    const { vehicleId, fecha, hora } = req.body;
    const { userId } = req;

    console.log("datos recibidos:" + vehicleId, fecha, hora)

    // Buscar el coche del usuario
    const userCars = await Vehicle.find({ user: userId });
    const coche = userCars.find((car) => car._id.toString() === vehicleId);

    const user = await User.findById(userId);

    if (!coche) {
      return res.status(404).json({ message: "Vehículo no encontrado" });
    }

    // Construir fechas para Google Calendar
    const startDateTime = new Date(`${fecha}T${hora}:00`);
    const endDateTime = new Date(startDateTime);
    endDateTime.setHours(endDateTime.getHours() + 1); // cita de 1 hora

    // Crear evento
    const event = {
      summary: `Cita de taller - ${coche.vin}`,
      description: `
🚗 Datos del vehículo:
- Marca y modelo: ${coche.specs.longType}
- VIN: ${coche.vin}

👤 Datos del cliente:
- Nombre: ${user.name}
- Correo electrónico: ${user.email}

🗓 Fecha y hora de la cita: ${startDateTime.toLocaleString("es-ES", {
        timeZone,
      })}
  `,
      start: { dateTime: startDateTime.toISOString(), timeZone },
      end: { dateTime: endDateTime.toISOString(), timeZone },
      extendedProperties: {
    private: {
      status: "pendiente",       // Estado de la cita
      vin: coche.vin,      // ID del vehículo
    }
  }
    };

    // Insertar evento en Google Calendar
    const response = await calendar.events.insert({
      calendarId,
      requestBody: event,
    });

    res.status(201).json({
      message: "Cita creada en Google Calendar",
      eventId: response.data.id,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al crear cita", error: error.message });
  }
};

const userAppointments = async (req,res) => {
  try {
    const { isLoggedIn } = req;
    if (!isLoggedIn) {
      return res.status(401).json({ message: "No estás autenticado" });
    }


    const events = await calendar.events.list({
  calendarId,
  timeMin: new Date().toISOString(), // solo eventos futuros
  maxResults: 100,
  singleEvents: true,
  orderBy: "startTime"
});
    res.status(200).json({ message: events.data.items });
  } catch (error) {
    return res.status(500).json({ message: "Ha habido un error", error });
  }
};



const cancelAppointment = async (req,res) =>{
    try{
    const { isLoggedIn } = req;

    if (!isLoggedIn) {
      return res.status(401).json({ message: "No estás autenticado" });
    }

    const { eventId } = req.params; 

    if (!eventId) {
      return res.status(400).json({ message: "Falta el ID del evento" });
    }

    await calendar.events.delete({
      calendarId,
      eventId,
    });

    res.status(200).json({ message: "Cita eliminada correctamente" });



    }catch (error){
        return res.status(500).json({message: "Ha habido un error", error})
    }
}

module.exports = { scheduleAppointment, userAppointments , cancelAppointment };
