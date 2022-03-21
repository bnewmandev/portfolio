import express from "express";
import bcrypt from "bcrypt";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

export = router;
