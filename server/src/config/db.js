const mongo = require("mongoose")

const connectDB = async () =>{
    try{
        await mongo.connect(process.env.DB_URL)
        console.log("Conexion con la Base de Datos exitosa")

    }catch (error){
        console.log("Ha habido un problema al conectar con la Base de Datos", error) 
    }
}

module.exports = { connectDB }