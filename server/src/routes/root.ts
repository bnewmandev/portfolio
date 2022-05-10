import express from "express";
import data from "../../portfolioData.json";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { items: data });
});
export = router;