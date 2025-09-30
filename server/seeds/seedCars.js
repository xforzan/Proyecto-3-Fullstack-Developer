const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const Vehicle = require("../src/api/models/Vehicle"); // modelo
const carsCsvPath = path.join(__dirname, "../seeds/cars.csv"); // tu CSV

async function seedCars() {
  try {
    // Conexión directa
    await mongoose.connect(
      "mongodb+srv://xforzan:Omega300$@cluster0.zjqeiyn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Conectado a MongoDB");

    // Vaciar colección
    await Vehicle.collection.drop().catch(() =>
      console.log("Colección Vehicles vacía o no existía")
    );

    // Leer CSV
    const raw = fs.readFileSync(carsCsvPath, "utf8");
    const lines = raw.trim().split("\n");
    const headers = lines.shift().split(",");

    const records = lines.map((line) => {
      const values = line.split(",");
      const obj = headers.reduce((obj, header, i) => {
        obj[header] = values[i];
        return obj;
      }, {});

      // Combinar columnas images[0], images[1], images[2] en un array
      const images = [];
      for (let i = 0; i <= 2; i++) {
        const key = `images[${i}]`;
        if (obj[key] && obj[key].trim() !== "") {
          images.push(obj[key].trim());
        }
        delete obj[key]; // borrar propiedad individual
      }
      obj.images = images;

      // Agrupar specs.*
      const specs = {};
      Object.keys(obj).forEach((key) => {
        if (key.startsWith("specs.")) {
          specs[key.replace("specs.", "")] = obj[key];
          delete obj[key];
        }
      });
      obj.specs = specs;

      return obj;
    });

    // Insertar en la colección
    await Vehicle.insertMany(records);

    console.log("✅ Seed de Vehicles cargada correctamente");
  } catch (error) {
    console.error("❌ Error en la seed:", error);
  } finally {
    await mongoose.disconnect();
  }
}

seedCars();
