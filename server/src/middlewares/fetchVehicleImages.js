const cloudinary = require("cloudinary").v2;
const { MERCEDES_API_KEY } = process.env;

const fetchVehicleImages = async (req, res, next) => {
  const { vin } = req.body;

  try {
    const URL_IMAGES = `https://api.mercedes-benz.com/vehicle_images/v2/vehicles/${vin}`;

    const imgRes = await fetch(URL_IMAGES, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": MERCEDES_API_KEY,
      },
    });

    console.log("Respuesta imgRes status:", imgRes.status);

    if (!imgRes.ok) {
      return res
        .status(imgRes.status)
        .json({ message: "Error al obtener imágenes de Mercedes" });
    }

    const imgData = await imgRes.json();

    // Obtenemos todas las IDs devueltas
    const ids = Object.values(imgData || {});
    if (ids.length === 0) {
      console.log("No hay imágenes disponibles en la respuesta de Mercedes.");
    }

    // Seleccionamos solo la 2ª, 3ª y 6ª imagen
    const selectedIds = [ids[1], ids[2], ids[5]].filter(Boolean);

    const images = [];
    for (let imgId of selectedIds) {
      console.log("Procesando imagen con ID:", imgId);

      const imageDetailRes = await fetch(
        `https://api.mercedes-benz.com/vehicle_images/v2/images/${imgId}`,
        { headers: { "x-api-key": MERCEDES_API_KEY } }
      );

      const arrayBuffer = await imageDetailRes.arrayBuffer();
      const base64 = Buffer.from(arrayBuffer).toString("base64");

      const uploaded = await cloudinary.uploader.upload(
        `data:image/jpeg;base64,${base64}`,
        {
          folder: `vehicles/${vin}`, // Guardar en carpeta por VIN
        }
      );

      images.push(uploaded.secure_url);
      console.log("Imagen subida a Cloudinary:", uploaded.secure_url);
    }

    req.images = images;
    console.log("Imágenes finales (2ª, 3ª y 6ª):", images);

    next();
  } catch (error) {
    console.error("Error en fetchVehicleImages:", error);
    next(error);
  }
};

module.exports = { fetchVehicleImages };
