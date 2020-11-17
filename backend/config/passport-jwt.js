const JwtStrategy = require("passport-jwt").Strategy;
const User = require("../Model/UserModel");
const dotenv = require("dotenv");

dotenv.config();

///question process.env is undefined
const myStrategy = new JwtStrategy(
  {
    jwtFromRequest: (req) => {
      console.log(req.cookies);

      return req.cookies.jwt;
    },
    secretOrKey: process.env.SECRET,
  },
  async (payload, done) => {
    console.log(payload);
    const id = payload.sub;
    const user = await User.findById(id);
    if (user) {
      done(null, user);
    }
    if (!user) {
      done("user with this id not exist", false);
    }
  }
);

module.exports = myStrategy;
