const Vehicle = require("../api/models/Vehicle");

const deleteCars = async (vins = []) => {
  if (!Array.isArray(vins) || vins.length === 0) return "No hay VINs";

  try {
    for (const vin of vins) {
      await Vehicle.findOneAndDelete({ vin });
    }
    return "Vehículos eliminados correctamente";
  } catch (error) {
    console.error(error);
    throw new Error("Error al eliminar vehículos");
  }
};

module.exports = { deleteCars };
