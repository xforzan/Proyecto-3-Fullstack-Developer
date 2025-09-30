const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const login = async (req, res) => {
  try {
    let { isLoggedIn } = req;

    if (isLoggedIn) {
      return res.status(500).json({ message: "Ya estás autenticado"});
    }
    const { email, password } = req.body;
    const findUser = await User.findOne({ email });

    if (!findUser) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }
    const hash = findUser.password;

    const isMatch = bcrypt.compareSync(password, hash);

    if (!isMatch) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const token = jwt.sign({ userId: findUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });


res.cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  maxAge: 60 * 60 * 1000
});
  const user = await User.findOne({email})
  user.password = ""

res.status(200).json({ message: "Se ha iniciado sesión correctamente", user });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};



const register = async (req, res) => {
  try {
    let { isLoggedIn } = req;

    if (isLoggedIn) {
      return res.status(500).json({ message: "Ya estás autenticado"});
    }

    const { email } = req.body;
    if (await User.findOne({ email: email })) {
      return res.status(500).json({ message: "Este usuario ya existe"});
    }
    if (req.file){
      req.body.avatar = req.file.path 
    }else{req.body.avatar = "https://res.cloudinary.com/dileah1ig/image/upload/v1757442337/avatar_jt1vlf.png"}
    const user = await User.create(req.body);

    res.status(201).json({ message: "Usuario creado"});
  } catch (error) {
    res.status(500).json({ message: "Ha habido un problema al crear el usuraio", error });
  }
};



const verify = (req,res) =>{
  try{
    return res.status(200).json({isLoggedIn: req.isLoggedIn})

  }catch (error){
    return res.status(500).json({message:"Ha habido un error", error})
  }
}



const logOut = (req,res) =>{
  try {
    if(!req.isLoggedIn ){
      return res.status(500).json({message:"Ya esta cerrada la sesion"})
    }
    res.clearCookie('token', { httpOnly: true, secure: true });
    res.status(200).json({ message: 'Sesión cerrada' });
  } catch (error) {
    return res.status(500).json({message:"Ha habido un problema al cerrar sesion", error})
  }
}

module.exports = { login, register, verify, logOut};
