import express from "express";
import bodyParser from "body-parser";

import rootRouter from "./routes/root";
import articleRouter from "./routes/articles";

const port = 8080;
const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", rootRouter);
app.use("/articles", articleRouter);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
