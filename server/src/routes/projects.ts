import express from "express";

import Project from "../models/project";
import { AuthRequest, AuthResponse } from "../types";
import jwt from "jsonwebtoken";

const router = express.Router();

const authenticateMiddleware = (
  req: AuthRequest,
  res: AuthResponse,
  next: express.NextFunction
) => {
  if (!req.cookies.secureCookie) return res.sendStatus(401);
  const token = req.cookies.secureCookie;
  jwt.verify(
    token,
    process.env.JWT_KEY!,
    (err: any, user: string | jwt.JwtPayload | undefined) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    }
  );
};

router.get("/", async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

router.get("/new", authenticateMiddleware, (req, res) => {
  res.render("newProject", { item: new Project() });
});

router.get("/edit/:id", authenticateMiddleware, async (req, res) => {
  const project = await Project.findOne({ id: req.params.id });
  res.render("editProject", { item: project });
});

// router.get("/:id", async (req, res) => {
//   const project = await Project.findById(req.params.id);
//   if (!project) {
//     res.redirect("/");
//   }
//   res.render("fullArticle", { article });
// });

router.post(
  "/",
  authenticateMiddleware,
  async (req, res, next) => {
    req.body.project = new Project();
    next();
  },
  saveAndRedirect("newProject")
);

router.put(
  "/:id",
  authenticateMiddleware,
  async (req, res, next) => {
    req.body.project = await Project.findOne({ id: req.params.id });
    next();
  },
  saveAndRedirect("editProject")
);

router.delete("/:id", authenticateMiddleware, async (req, res) => {
  await Project.findOneAndDelete({ id: req.params.id });
  res.redirect("/");
});

function saveAndRedirect(path: string) {
  return async (req: express.Request, res: express.Response) => {
    let project = req.body.project;
    project.id = req.body.id;
    project.img = req.body.img;
    project.title = req.body.title;
    project.text = req.body.text;
    project.link = req.body.link;
    try {
      project = await project.save();
      res.redirect("/");
    } catch (e) {
      console.log(e);
      res.render(path, { item: project });
    }
  };
}

export = router;
