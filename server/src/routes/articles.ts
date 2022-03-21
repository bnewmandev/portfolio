import express from "express";

import Article from "../models/article";

const router = express.Router();

router.get("/", async (req, res) => {
  const articles = await Article.find().sort({ createdAt: "descending" });
  res.render("blog", { articles });
});

router.get("/new", (req, res) => {
  res.render("newArticle", { article: new Article() });
});

router.get("/edit/:id", async (req, res) => {
  const article = await Article.findById(req.params.id);
  res.render("editArticle", { article: article });
});

router.get("/:id", async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (!article) {
    res.redirect("/articles");
  }
  res.render("fullArticle", { article });
});

router.post(
  "/",
  async (req, res, next) => {
    req.body.article = new Article();
    next();
  },
  saveAndRedirect("new")
);

router.put(
  "/:id",
  async (req, res, next) => {
    req.body.article = await Article.findById(req.params.id);
    next();
  },
  saveAndRedirect("edit")
);

router.delete("/:id", async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.redirect("/articles");
});

function saveAndRedirect(path: string) {
  return async (req: express.Request, res: express.Response) => {
    let article = req.body.article;
    article.title = req.body.title;
    article.description = req.body.description;
    article.markdown = req.body.markdown;
    try {
      article = await article.save();
      res.redirect(`/articles/${article.id}`);
    } catch (e) {
      res.render(path, { article });
    }
  };
}

export = router;
