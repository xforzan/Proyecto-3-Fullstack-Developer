const Vehicle = require("../api/models/Vehicle");

const checkVehicleDuplicate = async (req, res, next) => {
  const { vin } = req.body;
  try {
    const existingVehicle = await Vehicle.findOne({ vin });
    if (existingVehicle) {
      return res.status(400).json({ message: "El VIN ya está registrado" });
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { checkVehicleDuplicate };