const getGroups = (user, callback) => {
    let query = `SELECT * FROM user_to_group WHERE user_id='${user}'`;
    con.query(query, (err, result) => {
        if (err)
            callback(err, null);
        if (result[0]) {
            result = JSON.parse(JSON.stringify(result));
            callback(null, result.map((elem) => elem["group_name"]));
        }
        else {
            callback(null, []);
        }
    });
};
app.post("/login", passport.authenticate("local"), (req, res) => {
    if (req.user || req.session.user) {
        return res.json({ user_name: req.user.username });
    }
    return res.status(401);
});
app.post("/register", jsonParser, (req, res) => {
    con.query(`SELECT * FROM users WHERE email='${req.body.email}'`, async (err, result) => {
        if (err)
            throw err;
        if (result[0]) {
            res.send({ userExists: true });
        }
        else {
            try {
                const hashedPassword = await bcrypt.hash(req.body.password, 10);
                const sql = `INSERT INTO users (username, email, password) VALUES ('${req.body.username}', '${req.body.email}', '${hashedPassword}')`;
                con.query(sql, (err, result) => {
                    if (err)
                        throw err;
                });
                res.send("Register succeeded");
            }
            catch {
                res.sendStatus(500);
            }
        }
    });
});
app.get("/log_out", (req, res) => {
    req.logOut();
    res.redirect("/");
});
app.get("/delete_account", (req, res) => {
    con.query(`DELETE FROM users WHERE id='${req.user.id}'`, (err, response) => {
        if (err)
            throw err;
        req.logOut();
        res.redirect("/");
    });
});
