const express = require("express");

const app = express();
const cors = require("cors");
require("dotenv").config();
const session = require("express-session");
const SESSION_SECRET = process.env.SESSION_SECRET;
const cookieParser = require("cookie-parser");
//port connection
const PORT = process.env.PORT || 3009;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(cookieParser());
// app.use(
//   cors({
//     origin: ["http://localhost:3000/"],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hey baby!");
});

require("./config/db.connections");

const routes = require("./routes");
app.use("/", routes.groups);
app.use("/", routes.users);
app.use("/", routes.events);

app.listen(PORT, () => {
  console.log("Hey we are playing on our favorite port:", PORT);
});
