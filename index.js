const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const UserRouter = require("./routes/user");
const Blog = require("./models/blog");
const blogRouter = require("./routes/blog");
const { checkForAuthenticationCookie } = require("./middleware/authentication");
require("dotenv").config();
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.resolve("./public")));
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

app.get("/", async (req, res) => {
  const allBlog = await Blog.find({});
  res.render("home", {
    user: req.user,
    blogs: allBlog,
  });
});

app.use("/user", UserRouter);
app.use("/blog", blogRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is started at ${process.env.PORT}`);
});
