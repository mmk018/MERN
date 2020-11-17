const jwt = require("jsonwebtoken");

const jwtIssuer = (User) => {
  const expiresIn = "1d";
  const payload = {
    sub: User.id,
    iat: Date.now(),
  };

  const token = jwt.sign(payload, process.env.SECRET, { expiresIn });
  console.log("jwt issuer token :", token);

  /* return {
    token,
    expiresIn,
  }; */
  return token;
};
console.log(process.env.SECRET);

module.exports = jwtIssuer;
