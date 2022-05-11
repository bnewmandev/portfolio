"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const project_1 = __importDefault(require("../models/project"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
const authenticateMiddleware = (req, res, next) => {
    if (!req.cookies.secureCookie)
        return res.sendStatus(401);
    const token = req.cookies.secureCookie;
    jsonwebtoken_1.default.verify(token, process.env.JWT_KEY, (err, user) => {
        if (err)
            return res.sendStatus(403);
        req.user = user;
        next();
    });
};
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const projects = yield project_1.default.find();
    res.json(projects);
}));
router.get("/new", authenticateMiddleware, (req, res) => {
    res.render("newProject", { item: new project_1.default() });
});
router.get("/edit/:id", authenticateMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield project_1.default.findOne({ id: req.params.id });
    res.render("editProject", { item: project });
}));
// router.get("/:id", async (req, res) => {
//   const project = await Project.findById(req.params.id);
//   if (!project) {
//     res.redirect("/");
//   }
//   res.render("fullArticle", { article });
// });
router.post("/", authenticateMiddleware, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    req.body.project = new project_1.default();
    next();
}), saveAndRedirect("newProject"));
router.put("/:id", authenticateMiddleware, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    req.body.project = yield project_1.default.findOne({ id: req.params.id });
    next();
}), saveAndRedirect("editProject"));
router.delete("/:id", authenticateMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield project_1.default.findOneAndDelete({ id: req.params.id });
    res.redirect("/");
}));
function saveAndRedirect(path) {
    return (req, res) => __awaiter(this, void 0, void 0, function* () {
        let project = req.body.project;
        project.id = req.body.id;
        project.img = req.body.img;
        project.title = req.body.title;
        project.text = req.body.text;
        project.link = req.body.link;
        try {
            project = yield project.save();
            res.redirect("/");
        }
        catch (e) {
            console.log(e);
            res.render(path, { item: project });
        }
    });
}
module.exports = router;
//# sourceMappingURL=projects.js.map