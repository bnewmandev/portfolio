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
const article_1 = __importDefault(require("../models/article"));
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
    const articles = yield article_1.default.find().sort({ createdAt: "descending" });
    res.render("blog", { articles });
}));
router.get("/new", authenticateMiddleware, (req, res) => {
    res.render("newArticle", { article: new article_1.default() });
});
router.get("/edit/:id", authenticateMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const article = yield article_1.default.findById(req.params.id);
    res.render("editArticle", { article });
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const article = yield article_1.default.findById(req.params.id);
    if (!article) {
        res.redirect("/articles");
    }
    res.render("fullArticle", { article });
}));
router.post("/", authenticateMiddleware, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    req.body.article = new article_1.default();
    next();
}), saveAndRedirect("new"));
router.put("/:id", authenticateMiddleware, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    req.body.article = yield article_1.default.findById(req.params.id);
    next();
}), saveAndRedirect("edit"));
router.delete("/:id", authenticateMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield article_1.default.findByIdAndDelete(req.params.id);
    res.redirect("/articles");
}));
function saveAndRedirect(path) {
    return (req, res) => __awaiter(this, void 0, void 0, function* () {
        let article = req.body.article;
        article.title = req.body.title;
        article.description = req.body.description;
        article.markdown = req.body.markdown;
        try {
            article = yield article.save();
            res.redirect(`/articles/${article.id}`);
        }
        catch (e) {
            res.render(path, { article });
        }
    });
}
module.exports = router;
//# sourceMappingURL=articles.js.map