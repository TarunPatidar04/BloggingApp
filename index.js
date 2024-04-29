const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const UserRouter = require("./routes/user");
const { checkForAuthenticationCookie } = require("./middleware/authentication");
require("dotenv").config();
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
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
  res.render("home", {
    user: req.user,
  });
});

app.use("/user", UserRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is started at ${process.env.PORT}`);
});
