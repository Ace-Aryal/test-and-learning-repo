import express from "express";
import dotenv from "dotenv";
dotenv.config();
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
  res.json({
    name: "Youtube",
    url: "https://www.youtube.com",
  });
});
// task 1: server 5 jokes in /jokes route
app.get("/api/jokes", (req, res) => {
  res.json([
    {
      id: 1,
      joke: "Why was the math book sad? Because it had too many problems.",
    },
    {
      id: 2,
      joke: "Why was the math book sad? Because it had too many problems.",
    },
    {
      id: 3,
      joke: "Why was the math book sad? Because it had too many problems.",
    },
    {
      id: 4,
      joke: "Why was the math book sad? Because it had too many problems.",
    },
    {
      id: 5,
      joke: "Why was the math book sad? Because it had too many problems.",
    },
  ]);
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
// server bana diya
