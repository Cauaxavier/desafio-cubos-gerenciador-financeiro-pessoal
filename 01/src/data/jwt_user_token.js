const jwt = require("jsonwebtoken");
const jwt_password = require("../utils/jwt_password");

module.exports = {
  sign(user) {
    return jwt.sign(user, jwt_password.jwt.password, jwt_password.jwt.options);
  },

  verify(token) {
    try {
      return jwt.verify(token, jwt_password.jwt.password);
    } catch (error) {
      return;
    }
  },
};
