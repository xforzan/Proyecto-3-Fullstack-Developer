const Vehicle = require("../models/Vehicle");
const { getUserVehicles } = require("../services/vehicleService");

const addVehicle = async (req, res) => {
  const { vin, km } = req.body;
  const { vehicleSpec, images } = req;
  const userId = req.userId;

  try {
    // --- Calcular emisiones ---
    const emissionValue =
      vehicleSpec?.technicalData?.find((item) => item.id === "85W")?.value ||
      vehicleSpec?.technicalData?.find((item) => item.id === "105W")?.value ||
      vehicleSpec?.primaryEngine?.emission?.combined ||
      vehicleSpec?.emission?.combined ||
      0;

    let emissionClass;
    if (emissionValue <= 120) emissionClass = "A";
    else if (emissionValue <= 140) emissionClass = "B";
    else if (emissionValue <= 155) emissionClass = "C";
    else if (emissionValue <= 165) emissionClass = "D";
    else if (emissionValue <= 190) emissionClass = "E";
    else if (emissionValue <= 225) emissionClass = "F";
    else emissionClass = "G";

    const colorMap = {
      A: "#69E99B",
      B: "#94E890",
      C: "#D2E165",
      D: "#FFD54D",
      E: "#FFBA7A",
      F: "#FF886D",
      G: "#FF5F5F",
    };

    // --- Construir vehicleSpec plano ---
    const flatSpecs = {
      longType: vehicleSpec?.longType || "N/A",
      marca: vehicleSpec?.brand?.text || "N/A",
      modelo: vehicleSpec?.model || "N/A",
      version: vehicleSpec?.additionalSpecs?.version || "N/A",
      carroceria: vehicleSpec?.body?.text || "N/A",
      motor: vehicleSpec?.primaryEngine?.cylinderCapacity || "N/A",
      combustible: vehicleSpec?.enginetype?.text || "N/A",
      cambio: vehicleSpec?.transmissiontype?.text?.split(" ")[1] || "N/A",
      cilindros:
        vehicleSpec?.technicalData?.find((item) => item.id == "33T")?.value ||
        "N/A",
      traccion:
        vehicleSpec?.wheelform ||
        vehicleSpec?.technicalData?.find((item) => item.id == "23T")?.value ||
        "N/A",
      potenciaKW: vehicleSpec?.powerkw || "N/A",
      potenciaCV: vehicleSpec?.powerps || "N/A",
      parNm:
        vehicleSpec?.technicalData?.find((item) => item.id == "38T")?.value ||
        "N/A",
      aceleracion:
        vehicleSpec?.technicalData?.find((item) => item.id == "47T")?.value ||
        "N/A",
      velocidadMax:
        vehicleSpec?.technicalData?.find((item) => item.id == "46T")?.value ||
        "N/A",
      neumaticoDelantero:
        vehicleSpec?.technicalData?.find((item) => item.id == "24T")?.value ||
        "N/A",
      neumaticoTrasero:
        vehicleSpec?.technicalData?.find((item) => item.id == "25T")?.value ||
        "N/A",
      emisionesCO2: emissionValue,
      claseEmisiones: emissionClass,
      colorEmisiones: colorMap[emissionClass] || "#9e9e9e"
    };

    const vehicle = await Vehicle.create({
      vin,
      km,
      images,
      user: userId,
      specs: flatSpecs, // Guardamos la versión “plana”
    });

    res
      .status(201)
      .json({ message: "Vehículo agregado correctamente", vehicle });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Ha habido un problema", error: error.message });
  }
};

const myCars = async (req, res) => {
  try {
    if (!req.isLoggedIn) {
      return res.status(401).send("No estás autenticado");
    }
    const { userId } = req;

    const data = await getUserVehicles(userId);

    return res.status(200).json({ message: "Todo OK", data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Ha habido un error", error });
  }
};


const allCars = async (req,res) =>{
  try{
    const vehiculos = await Vehicle.find()
    res.status(200).json({vehiculos})
  }catch (error){
    return res.status(500).json({message: "Ha habido un problema", error})
  }
}

module.exports = { addVehicle, myCars, allCars };
