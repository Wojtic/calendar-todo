const LocalStrategy = require("passport-local").Strategy;
import { index } from "./index";

function initialize(passport, getUserByEmail, getUserById) {
  const authenticateUser = async (email, password, done) => {
    getUserByEmail(email, async (err, user) => {
      if (err) throw err;
      if (user == null) {
        return done(null, false, { message: "No user with that email" });
      }

      try {
        if (await index.bcrypt.compare(password, user.password)) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Password incorrect" });
        }
      } catch (e) {
        return done(e);
      }
    });
  };
  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    getUserById(id, (err, user) => {
      if (err) throw err;
      done(null, user);
    });
  });
}

module.exports = initialize;
