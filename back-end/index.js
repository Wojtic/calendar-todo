const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const mysql = require('mysql');
const app = express();
require('dotenv').config();

let con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "calendar_todo"
});

con.connect((err) => {
    if (err) throw err;
    console.log("Connedcted to MySQL")
})

const initializePassport = require('./passport-config');
const { response } = require('express');
initializePassport(
    passport,
    (email, callback) => {
        let sql = `SELECT * FROM users WHERE email='${email}'`;
        let user;
        con.query(sql, (err, result) => {
            if (err) throw err;
            user = JSON.parse(JSON.stringify(result))[0];
            return callback(null, user);
        });
    },
    (id, callback) => {
        let sql = `SELECT * FROM users WHERE id='${id}'`;
        let user;
        con.query(sql, (err, result) => {
            if (err) throw err;
            user = JSON.parse(JSON.stringify(result))[0];
            return callback(null, user);
        });
    }
);

app.use(express.urlencoded({ extended: false }));

app.listen(3080, () => console.log('Listening at 3080'));
app.use(express.static('./src/public'));

app.use(flash());
app.use(session({
    secret: process.env.PP_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.post('/login', passport.authenticate('local'), (req, res) => {
    if (req.user || req.session.user) {
        return res.json({ user_name: req.user.username });
    }
    return res.status(401);
});

app.post('/register', (req, res) => {
    con.query(`SELECT * FROM users WHERE email='${req.body.email}'`, async (err, result) => {
        if (err) throw err;
        if (result[0]) {
            res.send({ userExists: true });
        } else {
            try {
                const hashedPassword = await bcrypt.hash(req.body.password, 10);

                const sql = `INSERT INTO users (username, email, password) VALUES ('${req.body.username}', '${req.body.email}', '${hashedPassword}')`;
                con.query(sql, (err, result) => {
                    if (err) throw err;
                });
                res.send("Register succeeded");
            } catch {
                res.sendStatus(500);
            }
        }
    });
});

app.get('/log_out', (req, res) => {
    req.logOut();
    res.redirect('/');
});

app.get('/delete_account', (req, res) => {
    con.query(`DELETE FROM users WHERE id='${req.user.id}'`, (err, response) => {
        if (err) throw err;
        req.logOut();
        res.redirect('/');
    });
});