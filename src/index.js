require('dotenv').config();

const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const mysql = require('mysql');

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "7qGAaj8t3SstjX",
    database: "calendar_todo"
});

con.connect((err) => {
    if (err) throw err;
    console.log("Connedcted to MySQL")
})

const initializePassport = require('./passport-config');
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

app.listen(3000, () => console.log('Listening at 3000'));
app.use(express.static('./src/public'));

app.use(flash());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: 'login.html',
    failureFlash: true
}));

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
                res.redirect('login.html');
            } catch {
                res.redirect('register.html');
            }
        }
    });
});

app.post('/check_user', async (req, res) => {
    if (req.user) {
        res.send({
            loggedIn: true,
            username: req.user.username
        });
    } else {
        res.send({ loggedIn: false });
    }
});