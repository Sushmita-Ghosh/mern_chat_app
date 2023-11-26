// jwt token - it helps in authorization in the backend, when user opts for any services we will send the token
// to the backend for checking if the user really is authorized or not

const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = generateToken;
