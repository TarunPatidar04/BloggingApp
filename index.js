const express = require("express");
const path = require("path");
require("dotenv").config();
const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is started at ${process.env.PORT}`);
});
