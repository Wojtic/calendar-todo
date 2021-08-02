import { account } from "./account";
export module index {
  const express = require("express");
  export const bcrypt = require("bcrypt");
  const passport = require("passport");
  const flash = require("express-flash");
  const session = require("express-session");
  const mysql = require("mysql");
  const bodyParser = require("body-parser");
  const app = express();
  require("dotenv").config();

  const jsonParser = bodyParser.json();

  export let con = mysql.createConnection({
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

  const checkAuth = (req, res) => {
    if (req.hasOwnProperty("user")) {
      return true;
    } else {
      res.sendStatus(401);
      return false;
    }
  };

  app.post("/login", passport.authenticate("local"), (req, res) => {
    if (req.user || req.session.user) {
      return res.json({ user_name: req.user.username });
    }
    return res.status(401);
  });

  app.post("/register", jsonParser, (req, res) => {
    account.register(req.body, res);
  });

  app.get("/log_out", (req, res) => {
    req.logOut();
    res.redirect("/");
  });

  app.get("/delete_account", (req, res) => {
    if (!checkAuth(req, res)) return;
    con.query(
      `DELETE FROM users WHERE id='${req.user.id}'`,
      (err, response) => {
        if (err) throw err;
        req.logOut();
        res.redirect("/");
      }
    );
  });

  app.post("/create_task", jsonParser, (req, res) => {
    if (!(req.body.name && req.body.date && req.body.owner)) {
      res.sendStatus(400);
    } else if (checkAuth(req, res)) {
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
            req.body.owner.substring(0, 6) == "group-"
              ? "group_name"
              : "user_id"
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
    }
  });

  app.get("/get_tasks", (req, res) => {
    if (!checkAuth(req, res)) return;
    // select all tasks with user id
    let query = `SELECT tasks.task_id,task_name,task_description,task_date
                  FROM tasks
                  INNER JOIN task_to_owner ON tasks.task_id = task_to_owner.task_id
                  WHERE user_id = ${req.user.id}`;
    con.query(query, (err, result) => {
      if (err) throw err;
      else res.send(JSON.parse(JSON.stringify(result)));
    });
    // select all tasks with groups the user is part of
  });

  app.get("/get_groups", (req, res) => {
    if (!checkAuth(req, res)) return;
    account.getGroups(req.user.id, (err: Error, result) => {
      if (err) throw err;
      res.send(result);
    });
  });

  app.post("/remove_task", jsonParser, (req, res) => {
    if (!checkAuth(req, res)) return;

    let query = `DELETE tasks , task_to_owner  FROM tasks INNER JOIN task_to_owner  
WHERE tasks.task_id= task_to_owner.task_id and tasks.task_id = ${req.body.task_id}`;
    con.query(query, (err, result) => {
      if (err) throw err;
      else res.sendStatus(200);
    });
  });
}
