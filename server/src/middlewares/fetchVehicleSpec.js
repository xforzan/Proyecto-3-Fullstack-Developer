const { MERCEDES_API_KEY } = process.env;

const fetchVehicleSpec = async (req, res, next) => {
  const { vin } = req.body;
  try {
    const URL_SPEC = `https://api.mercedes-benz.com/vehicle_specifications/v1/vehicles/${vin}?locale=es_ES&payloadNullValues=false`;

    const response = await fetch(URL_SPEC, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": MERCEDES_API_KEY,
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({ message: "Error al obtener especificaciones de Mercedes" });
    }

    const specData = await response.json();
    req.vehicleSpec = specData.vehicleData;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { fetchVehicleSpec };
