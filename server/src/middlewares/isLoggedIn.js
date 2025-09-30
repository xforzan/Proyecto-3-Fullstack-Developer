const jwt = require("jsonwebtoken");

const isLoggedIn = (req, res, next) => {
  
  const { token } = req.cookies;
  req.isLoggedIn = false;
  if (!token) {
    return next();
  }
  
  try {
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.isLoggedIn = true;
    req.userId = decoded.userId;
    console.error(decoded)
  } catch (err) {
    console.log("Token inválido o expirado:", err.message);
    req.isLoggedIn = false;
  }

  next();
};

module.exports = { isLoggedIn };
