require("dotenv").config();
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const massive = require("massive");
const cors = require("cors");
const session = require("express-session");

const authCtrl = require("./controllers/authCtrl");

const {
  addDream,
  getDream,
  getUser,
  shareDream,
  getPublicDreams,
  addRating,
  deleteDream
} = require("./controllers/controller");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 * 56
    }
  })
);

const port = process.env.SERVER_PORT || 4000;

massive(process.env.CONNECTION_STRING)
  .then(dbInstance => {
    app.set("db", dbInstance);
  })
  .catch(err => console.log(err));

authCtrl(app);

app.use(express.static(`${__dirname}/../build/`));

//DREAM ENDPOINTS
app.post("/api/dreams", addDream);
app.get("/api/dreams/:id", getDream);
app.put("/api/dreams", shareDream);
app.get("/api/publicDreams", getPublicDreams);
app.put("/api/ratings/:id", addRating);
app.delete("/api/dreams/delete/:id", deleteDream);

//getUser Endpoint
app.get("/api/getUser", (req, res) => {
  if (req.user) {
    res.status(200).send(req.user);
  } else {
    res.status(401).send({ message: "Please login" });
  }
});

function authenticated(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
