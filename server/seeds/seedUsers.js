const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const User = require("../src/api/models/User"); // tu modelo

const usersCsvPath = path.join(__dirname, "../seeds/users.csv");

async function seedUsers() {
  try {
    await mongoose.connect(
      "mongodb+srv://xforzan:Omega300$@cluster0.zjqeiyn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Conectado a MongoDB");

    await User.collection.drop().catch(() => console.log("Colección Users vacía o no existía"));

    const raw = fs.readFileSync(usersCsvPath, "utf8");
    const lines = raw.trim().split("\n");
    const headers = lines.shift().split(",");

    const usersData = lines.map((line) => {
      // Separar solo las primeras 4 comas, el resto es avatar
      const parts = line.split(",");
      const obj = {
        _id: parts[0],
        name: parts[1],
        email: parts[2],
        password: parts[3],
        avatar: parts.slice(4).join(",") // junta el resto como avatar
      };
      return obj;
    });

    await User.insertMany(usersData);

    console.log("✅ Seed de Users cargada correctamente desde CSV");
  } catch (error) {
    console.error("❌ Error en la seed:", error);
  } finally {
    await mongoose.disconnect();
  }
}

seedUsers();
