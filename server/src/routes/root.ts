import express from "express";
import data from "../../portfolioData.json";
import Project from "../models/project";

const router = express.Router();

router.get("/", (req, res) => {
  Project.find().then((result) => {
    res.render("index", { projects: result });
  });
});
export = router;
