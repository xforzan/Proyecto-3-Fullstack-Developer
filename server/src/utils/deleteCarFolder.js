const cloudinary = require("cloudinary").v2;

const deleteCarFolder = async (vins = []) => {
  for (const vin of vins) {
    console.log("Eliminando carpeta y recursos del VIN:", vin);
    try {

      const res = await cloudinary.api.delete_resources_by_prefix(`vehicles/${vin}`, { resource_type: "image" });
      console.log(`Imágenes de ${vin} eliminadas:`);

      await cloudinary.api.delete_folder(`vehicles/${vin}`);
      console.log(`Carpeta vehicles/${vin} eliminada`);

    } catch (err) {
      console.error(`Error eliminando imágenes/carpeta de ${vin}:`, err);
    }
  }

  return results;
};

module.exports = { deleteCarFolder };
