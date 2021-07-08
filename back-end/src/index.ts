const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();

const jsonParser = bodyParser.json();

let con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "calendar_todo",
});

con.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL");
});

const initializePassport = require("./passport-config");
initializePassport(
  passport,
  (email: String, callback: (err: Error, result) => void) => {
    let sql = `SELECT * FROM users WHERE email='${email}'`;
    let user;
    con.query(sql, (err: Error, result) => {
      if (err) throw err;
      user = JSON.parse(JSON.stringify(result))[0];
      return callback(null, user);
    });
  },
  (id: number, callback: (err: Error, res: any) => void) => {
    let sql = `SELECT * FROM users WHERE id='${id}'`;
    let user;
    con.query(sql, (err: Error, result) => {
      if (err) throw err;
      user = JSON.parse(JSON.stringify(result))[0];
      return callback(null, user);
    });
  }
);

app.use(express.urlencoded({ extended: false }));

app.listen(3080, () => console.log("Listening at 3080"));
app.use(express.static("./src/public"));

app.use(flash());
app.use(
  session({
    secret: process.env.PP_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

const getGroups = (user, callback) => {
  let query = `SELECT * FROM user_to_group WHERE user_id='${user}'`;
  con.query(query, (err, result) => {
    if (err) callback(err, null);
    if (result[0]) {
      result = JSON.parse(JSON.stringify(result));
      callback(
        null,
        result.map((elem) => elem["group_name"])
      );
    } else {
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
  con.query(
    `SELECT * FROM users WHERE email='${req.body.email}'`,
    async (err, result) => {
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
    }
  );
});

app.get("/log_out", (req, res) => {
  req.logOut();
  res.redirect("/");
});

app.get("/delete_account", (req, res) => {
  con.query(`DELETE FROM users WHERE id='${req.user.id}'`, (err, response) => {
    if (err) throw err;
    req.logOut();
    res.redirect("/");
  });
});

app.post("/create_task", jsonParser, (req, res) => {
  if (!(req.body.name && req.body.date && req.body.owner)) {
    res.sendStatus(400);
  } else if (req.user || req.session.user) {
    let queryString = `INSERT INTO tasks (task_name, task_description, task_date) VALUES ('${
      req.body.name
    }', '${req.body.description || ""}', '${req.body.date}')`;

    con.query(queryString, (err, response) => {
      if (err) throw err;
      queryString = "SELECT LAST_INSERT_ID()";
      con.query(queryString, (err, response) => {
        if (err) throw err;
        let task_id = JSON.parse(JSON.stringify(response[0]));
        task_id = task_id[Object.keys(task_id)[0]];
        queryString = `INSERT INTO task_to_owner (task_id, ${
          req.body.owner.substring(0, 6) == "group-" ? "group_name" : "user_id"
        }) VALUES (${task_id}, ${
          req.body.owner.substring(0, 6) == "group-"
            ? `'${req.body.owner}'`
            : req.user.id
        })`;
        con.query(queryString, (err, response) => {
          if (err) throw err;
          else res.sendStatus(200);
        });
      });
    });
  } else {
    res.sendStatus(401);
  }
});

app.get("/get_tasks", (req, res) => {
  if (req.user || req.session.user) {
    // select all tasks with user id
    let query = `SELECT * FROM task_to_owner WHERE user_id=${req.user.id}`;
    con.query(query, (err, result) => {
      if (err) throw err;
      console.log(result);
    });
    // select all tasks with groups the user is part of
  } else {
    res.sendStatus(401);
  }
});

app.get("/get_groups", (req, res) => {
  if (req.user.id || req.session.user.id) {
    getGroups(req.user.id, (err: Error, result) => {
      if (err) throw err;
      res.send(result);
    });
  }
});
