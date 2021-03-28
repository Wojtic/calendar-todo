require('dotenv').config();

const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');

let users = [];

const initializePassport = require('./passport-config');
initializePassport(
    passport,
    username => users.find(user => user.username === username),
    id => users.find(user => user.id === id)
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

app.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        users.push({
            id: Date.now().toString(),
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });
        res.redirect('login.html');
    } catch {
        res.redirect('register.html');
    }
    console.log(users);
});