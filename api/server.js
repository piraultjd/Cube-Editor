const express = require("express");
const app = express();
const port = 3000;
const sqlite3 = require("sqlite3");

const db = new sqlite3.Database("./cubes.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) return console.error(err.message);

  console.log("Success");
});

db.run("CREATE TABLE cubes(cube_name, cards, date_created, id)");

app.get("/api/get", (req, res) => {
  const dbSelect = "SELECT * FROM cubes";
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.post("/cubes", (req, res) => {
  const cubeName = req.body.cubeName;
  const dateCreated = req.body.dateCreated;
  const sqlite3Insert =
    "INSERT INTO cubes (cubeName, dateCreated) VALUES (?, ?) ";
  db.query(sqliteInsert, [cubeName, dateCreated], (err, result) => {});
  console.log(result);
});

db.close((err) => {
  if (err) console.error(err.message);
});
