const validateVehicle = (req, res, next) => {

  if(req.isLoggedIn == false){
    return res.status(401).json({message: "No estas autenticado/a"})
  }
  const { vin, km } = req.body;
  if (!vin || km === undefined) {
    return res.status(400).json({ message: "Falta VIN o km" });
  }
  next();
};

module.exports = { validateVehicle };
