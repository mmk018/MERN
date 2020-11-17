const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const dotenv = require("dotenv");

dotenv.config();

// configure passport library to use passport-jwt
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "secret",
};

function configurePassport(passport) {
  passport.use(
    new JwtStrategy(options, (payload, done) => {
      console.log(payload);

      done(null, {});
      // check for user in database
    })
  );
}

module.exports = configurePassport;
