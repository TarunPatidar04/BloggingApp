const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const UserRouter = require("./routes/user");
require("dotenv").config();
const app = express();
app.use(express.urlencoded({ extended: false }));
mongoose
  .connect("mongodb://localhost:27017/blogify")
  .then(() => {
    console.log("Mongodb is Connected");
  })
  .catch((error) => {
    console.log("Mongodb Connectivity error", error);
  });

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", (req, res) => {
  res.render("home");
});

app.use("/user", UserRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is started at ${process.env.PORT}`);
});
