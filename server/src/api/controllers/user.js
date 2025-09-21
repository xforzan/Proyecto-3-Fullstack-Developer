
const logIn = (req,res) =>{
    try{
        res.status(200).json({message:"Todo OK"})
    }catch(error){
        res.status(500).json({message:"Ha habido un problema", error})
    }
}


module.exports = { logIn }