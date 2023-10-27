module.exports = {
  jwt: {
    password: process.env.JWT_SECRET,
    options: {
      expiresIn: "4h",
    },
  },
};
