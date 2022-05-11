import express from "express";
import mongoose from "mongoose";
import methodOverride from "method-override";
import jwt from "jsonwebtoken";
import "dotenv/config";
import bcrypt from "bcrypt";
import dayjs from "dayjs";
import cookieParser from "cookie-parser";

import rootRouter from "./routes/root";
import articleRouter from "./routes/articles";
import projectRouter from "./routes/projects";

const port = process.env.PORT;
const app = express();

mongoose.connect(process.env.MONGODB_URI!);

app.set("view engine", "ejs");

app.use(cookieParser(process.env.COOKIE_KEY!));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.use("/", rootRouter);
app.use("/articles", articleRouter);
app.use("/projects", projectRouter);

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  bcrypt.compare(req.body.password, process.env.ADMIN_HASH!, (err, result) => {
    console.log(result);
    if (err) res.sendStatus(401);
    else if (!result) res.sendStatus(401);
    else {
      jwt.sign(
        { permissions: ["ADMIN"] },
        process.env.JWT_KEY!,
        (err: any, token: any) => {
          if (err) res.sendStatus(500);
          else {
            res.cookie("secureCookie", token, {
              // secure: true,
              // httpOnly: true,
              expires: dayjs().add(1, "days").toDate(),
            });
            res.cookie("showAllButtons", "true", {
              expires: dayjs().add(1, "days").toDate(),
            });
            res.redirect("/");
          }
        }
      );
    }
  });
});

app.get("/cookies", (req, res) => {
  res.json({ unsigned: req.cookies, signed: req.signedCookies });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
