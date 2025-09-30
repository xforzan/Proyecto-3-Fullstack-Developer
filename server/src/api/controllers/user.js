const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { deleteFile } = require("../../utils/deleteFile");
const { deleteCarFolder } = require("../../utils/deleteCarFolder")
const { deleteCars } = require("../../utils/deleteCars")
const { getUserVehicles } = require("../services/vehicleService");




const myUser = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: "No hay token por verificar" });
    }
    const tokenData = jwt.verify(token, process.env.JWT_SECRET);

    const userData = await User.findById(tokenData.userId);
    userData.password = "";
    res.status(200).json(userData);
  } catch (error) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};

const deleteMyUser = async (req, res) => {
  console.log("aqui entra")
  try {
    const { userId } = req;
    console.log("paso2")

    const vehicles = await getUserVehicles(userId)
    const vins = vehicles.map(vehicle => vehicle.vin);
    console.log(vins)
    deleteCarFolder(vins)
    deleteCars(vins)
    res.status(200).send("Usuario eliminado satisfactoriamente");
  } catch (error) {
    res.status(500).json({message:"Ha habido un error al eliminar el usuario", error});
  }
};

const avatar = async (req, res) => {
  try {
    if(!req.isLoggedIn){
      return res.status(500).json({message:"Por favor, inicia sesión para poder cambiar el avatar"})
    }
    const { path } = req.file
    if(!path){
      return res.status(500).json({message:"Por favor, sube una imagen y vuelve a intentarlo"})
    }
    const token = req.cookies.token;

    const user = jwt.verify(token, process.env.JWT_SECRET);

    const userData = await User.findById(user.userId)
    const deletePath = userData.avatar
    await User.findByIdAndUpdate(user.userId,({avatar: path}))
    deleteFile(deletePath);
    return res.status(200).json({message:"El avatar ha sido cambiado correctamente", path})
  } catch (error) {
    return res.status(500).json({ message: "Ha habido un error al subir el avatar", error });
  }
};

module.exports = { myUser, deleteMyUser, avatar };
