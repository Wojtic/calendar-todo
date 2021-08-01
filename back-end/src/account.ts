import { index } from "./index";

export module account {
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
}
