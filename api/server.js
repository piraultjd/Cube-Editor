const express = require("express");
const app = express();
const port = 3001;
const sqlite3 = require("sqlite3");
const cors = require("cors");

const db = new sqlite3.Database("./cubes.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) return console.error(err.message);

  console.log("Success");
});

// db.run(
//   "CREATE TABLE cards(name, card_id, image, color, card_set, cube_id, set_icon, id integer primary key)"
// );

// db.run(
//   "CREATE TABLE cubes(cube_name, cards, date_created, id integer primary key)"
// );

app.use(cors());
app.use(express.json());

app.get("/cubes", (req, res) => {
  const sqlite3Select = "SELECT * FROM cubes";
  db.all(sqlite3Select, (req, result) => {
    res.send(result);
  });
});

app.get("/cards/:id", (req, res) => {
  const cubeId = req.params.id;
  db.all("SELECT * FROM cards WHERE cube_id = ?", cubeId, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

app.post("/cards", (req, res) => {
  console.log(req.body);
  const cardName = req.body.cardName;
  const cardId = req.body.cardId;
  const image = req.body.image;
  const color = req.body.color;
  const cardSet = req.body.cardSet;
  const cubeId = req.body.cubeId;
  const setIcon = req.body.setIcon;
  const sqlite3Insert =
    "INSERT INTO cards (name, card_id, image, color, card_set, cube_id, set_icon, id) VALUES (?, ?, ?, ?, ?, ?, ?, ?) ";
  db.run(
    sqlite3Insert,
    [cardName, cardId, image, color, cardSet, cubeId, setIcon],
    (result, err) => {
      if (err) {
        console.error(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/cubes", (req, res) => {
  console.log(req.body);
  const cubeName = req.body.cubeName;
  const dateCreated = req.body.dateCreated;
  const sqlite3Insert =
    "INSERT INTO cubes (cube_name, date_created, id) VALUES (?, ?, ?) ";
  db.run(sqlite3Insert, [cubeName, dateCreated], (result, err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(result);
    }
    // // db.close((err) => {
    // //   if (err) console.error(err.message);
    // });
  });
});

app.delete("/cubes/delete/:id", (req, res) => {
  const cubeId = req.params.id;
  db.all("DELETE FROM cubes WHERE id = ?", cubeId, (err, result) => {
    if (err) {
      console.log(err);
    }
  });
  db.all("DELETE FROM cards WHERE cube_id = ?", cubeId, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
