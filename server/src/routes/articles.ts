import express from "express";

const router = express.Router();

const articles = [
  {
    title: "Test Article 1",
    createdAt: 1647695614248,
    description: "test description",
  },
  {
    title: "Test Article 2",
    createdAt: 1647695614248,
    description: "test description",
  },
  {
    title: "Test Article 3",
    createdAt: 1647695614248,
    description: "test description",
  },
  {
    title: "Test Article 3",
    createdAt: 1647695614248,
    description: "test description",
  },
  {
    title: "Test Article 3",
    createdAt: 1647695614248,
    description: "test description",
  },
];

router.get("/", (req, res) => {
  res.render("blog", { articles });
});

export = router;
