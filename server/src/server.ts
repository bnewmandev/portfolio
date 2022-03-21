import express from "express";
import mongoose from "mongoose";
import methodOverride from "method-override";
import "dotenv/config";

import rootRouter from "./routes/root";
import articleRouter from "./routes/articles";

const port = 8080;
const app = express();

mongoose.connect(process.env.MONGODB_URI!);

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.use("/", rootRouter);
app.use("/articles", articleRouter);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
