import express from "express";
import bodyParser from "body-parser";

const port = 8080;
const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/ping", (req, res) => {
  res.send("pong!");
});

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});