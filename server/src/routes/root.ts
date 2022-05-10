import express from "express";
import data from "../../portfolioData.json";

const router = express.Router();

router.get("/", (req, res) => {
<<<<<<< HEAD
  console.log(data);
  res.render("index", {items: data});

=======
  res.render("index", { items: data });
  console.log(data);
>>>>>>> c60f89f5c732a5fcfc2715421e407eedf7dcada2
});

export = router;
