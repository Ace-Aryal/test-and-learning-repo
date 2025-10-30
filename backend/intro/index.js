require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/about", (req, res) => {
  res.send("About");
});
app.get("/welcome", (req, res) => {
  res.send("<h1 style='color: red ; background-color: blue'>Welcome</h1>");
});
app.get("/youtube", (req, res) => {
  //
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
// server bana diya
