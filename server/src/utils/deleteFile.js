const cloudinary = require("cloudinary").v2;

const deleteFile = async (url) => {
  try {
    const array = url.split("/");
    const name = array.at(-1).split(".")[0];
    const public_id = `${array.at(-2)}/${name}`;

    const result = await cloudinary.uploader.destroy(public_id);
    console.log(url,result)
    if (result.result === "ok") {
      console.log("Imagen eliminada satisfactoriamente");
    } else {
      console.log("No se encontró la imagen o no se ha podido eliminar");
    }
  } catch (error) {
    console.error("Ha habido un problema al eliminar la imagen", error);
  }
};

module.exports = { deleteFile };
