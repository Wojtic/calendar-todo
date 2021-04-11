const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function initialize(passport, getUserByUsername, getUserById) {
    const authenticateUser = async (username, password, done) => {
        getUserByUsername(username, async (err, user) => {
            if (err) throw err;
            if (user == null) {
                return done(null, false, { message: 'No user with that username' });
            }

            try {
                if (await bcrypt.compare(password, user.password)) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Password incorrect' });
                }
            } catch (e) {
                return done(e);
            }
        });

    };
    passport.use(new LocalStrategy({ usernameField: 'username' }, authenticateUser));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => {
        getUserById(id, (err, user) => {
            if (err) throw err;
            done(null, user);
        })
    });
}

module.exports = initialize;