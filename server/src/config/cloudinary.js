const cloudinary = require("cloudinary").v2;

const connectCloudinary = async () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      api_key: process.env.CLOUDINARY_API_KEY,
    });
    console.log("Conectado con cloudinary exitosamente");
  } catch (error) {
    console.log("Ha habido un error al establecer la conexion con cloudinary");
  }
  
};

module.exports = { connectCloudinary };
