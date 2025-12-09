import express from "express";
import "dotenv/config";
const app = new express();
const port = process.env.PORT;
app.get("/", (req, res) => {
  res.send("Hello there");
});

app.get("/json", (req, res) => {
  res.json({
    message: "Hola",
  });
});

app.listen(port, () => {
  console.log(`App listening at port ${port}`);
});
