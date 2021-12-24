import { index } from "./index";

export module account {
  // -------------------------------------------------- Register

  export const register = (body, res) => {
    index.con.query(
      `SELECT * FROM users WHERE email='${body.email}'`,
      async (err, result) => {
        if (err) throw err;
        if (result[0]) {
          res.send({ userExists: true });
        } else {
          try {
            const hashedPassword = await index.bcrypt.hash(body.password, 10);

            const sql = `INSERT INTO users (username, email, password) VALUES ('${body.username}', '${body.email}', '${hashedPassword}')`;
            index.con.query(sql, (err, result) => {
              if (err) throw err;
            });
            res.send("Register succeeded");
          } catch {
            res.sendStatus(500);
          }
        }
      }
    );
  };

  // -------------------------------------------------- Groups

  export const getGroups = (user, callback) => {
    let query = `SELECT * FROM user_to_group WHERE user_id='${user}'`;
    index.con.query(query, (err, result) => {
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

  export const joinGroup = (user, group, callback) => {
    // check if group exists
    let sql = `SELECT * FROM user_groups WHERE  group_name='${group}'`;
    index.con.query(sql, (err, result) => {
      if (err) callback(err, null);
      if (result[0]) {
        // check if user is already in group
        sql = `SELECT * FROM user_to_group WHERE user_id='${user}' AND group_name='${group}'`;
        index.con.query(sql, (err, result) => {
          if (err) callback(err, null);
          if (result[0]) {
            callback(null, "User already in group");
          } else {
            // add user to group
            sql = `INSERT INTO user_to_group (user_id, group_name) VALUES ('${user}', '${group}')`;
            index.con.query(sql, (err, result) => {
              if (err) callback(err, null);
              callback(null, "User added to group");
            });
          }
        });
      } else {
        callback(null, "Group does not exist");
      }
    });
  };
}
