const express = require("express");
const app = express();
const port = 3001;
const sqlite3 = require("sqlite3");
const cors = require("cors");
const redis = require("ioredis");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { v4: uuidv4 } = require("uuid");
const cookieParser = require("cookie-parser");

const db = new sqlite3.Database("./cubes.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) return console.error(err.message);

  console.log("Success");
});

const client = redis.createClient();

client.on("connect", function () {
  console.log("Connected to Redis");
});
// client.connect();
// async function init () {}

// db.run(
//   "CREATE TABLE cards(name, card_id, image, color, card_set, cube_id, set_icon, id integer primary key)"
// );

// db.run(
//   "CREATE TABLE cubes(cube_name, cards, date_created, username, id integer primary key)"
// );

// db.run("CREATE TABLE users(username UNIQUE, password, id integer primary key)");

app.use(
  cors({
    exposedHeaders: "Set-Cookie",
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(validateCookies);

async function validateCookies(req, res, next) {
  console.log(req.cookies["session_id"]);
  await client.get(req.cookies["session_id"], (err, username) => {
    if (err) throw err;
    req.username = username;
    console.log(req.username);
    next();
  });
}

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

app.get("/cubes", (req, res) => {
  const sqlite3Select = "SELECT * FROM cubes WHERE username = ?";
  db.all(sqlite3Select, req.username, (req, result) => {
    res.send(result);
  });
  console.log(req.username);
});

app.get("/cards/:id", (req, res) => {
  const cubeId = req.params.id;
  console.log("Getting Cards");
  console.log(req.params.id);
  db.all("SELECT * FROM cards WHERE cube_id = ?", cubeId, (err, result) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.send(result);
    }
  });
});

app.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const UUID = uuidv4();
  const userLogin = "SELECT * FROM users WHERE username = ?";
  db.get(userLogin, username, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      console.log(result);
      // res.send(result);
      bcrypt.compare(password, result.password, (err, isMatch) => {
        if (err) {
          console.error(err);
          console.log("Incorrect Password");
          res.sendStatus(400);
        } else if (isMatch === false) {
          console.log("Incorrect Password");
          res.sendStatus(401);
        } else {
          console.log("User Logged In");
          client.set(UUID, username, "EX", 3600);
          res.cookie("session_id", UUID, {
            maxAge: 9000000,
          });
          res.sendStatus(200);
        }
      });
    }
  });
});

app.post("/createAccount", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const userInsert =
    "INSERT INTO users (username, password, id) VALUES (?, ?, ?) ";
  db.run(userInsert, [username, hashedPassword], (err, result) => {
    if (err) {
      console.error(err);
      console.log("User Already Exists");
      res.sendStatus(400);
    } else {
      res.send(result);
      console.log({ username, hashedPassword });
    }
  });
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

app.post("/cubes", async (req, res) => {
  console.log(req.username);
  const cubeName = req.body.cubeName;
  const dateCreated = req.body.dateCreated;
  const username = req.username;
  const sqlite3Insert =
    "INSERT INTO cubes (cube_name, date_created, username, id) VALUES (?, ?, ?, ?) ";
  db.run(sqlite3Insert, [cubeName, dateCreated, username], (result, err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(result);
      res.send(result);
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
