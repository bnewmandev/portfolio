import express from "express";
import bodyParser from "body-parser";

const port = 8080;
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/ping", (req, res) => {
  res.send("pong!");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
