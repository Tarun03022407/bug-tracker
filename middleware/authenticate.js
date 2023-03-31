const jwt = require("jsonwebtoken");

require("dotenv").config();

const authenticate = (req, res, next) => {
  //console.log(1)
  const token = req.headers.authorization;
  if (token) {
    const decode = jwt.verify(token, process.env.key);
    if (decode) {
      const adminID = decode.adminID;
      req.body.adminID = adminID;
      next();
    } else {
      res.send("login first");
    }
  } else {
    res.send("login first");
  }
};
module.exports = { authenticate };
