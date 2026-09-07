const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  try {
    const headers = req.headers.authorization;
    //   console.log("authentication middleware working...", headers);
    if (!headers) {
      return res.status(500).json({
        success: false,
        message: "Not authenticate!!",
      });
    }

    const token = headers.split(" ")[1];
    //   console.log("token", token);
    if (!token) {
      return res.status(500).json({
        success: false,
        message: "Token doesnt match!!",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("decoded", decoded);
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = authentication;
