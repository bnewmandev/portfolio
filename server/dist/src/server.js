"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const method_override_1 = __importDefault(require("method-override"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const bcrypt_1 = __importDefault(require("bcrypt"));
const dayjs_1 = __importDefault(require("dayjs"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const root_1 = __importDefault(require("./routes/root"));
const articles_1 = __importDefault(require("./routes/articles"));
const projects_1 = __importDefault(require("./routes/projects"));
const port = process.env.PORT;
const app = (0, express_1.default)();
mongoose_1.default.connect(process.env.MONGODB_URI);
app.set("view engine", "ejs");
app.use((0, cookie_parser_1.default)(process.env.COOKIE_KEY));
app.use(express_1.default.static("public"));
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, method_override_1.default)("_method"));
app.use("/", root_1.default);
app.use("/articles", articles_1.default);
app.use("/projects", projects_1.default);
app.get("/login", (req, res) => {
    res.render("login");
});
app.get("/", (req, res) => {
    res.render("../views/index");
});
app.post("/login", (req, res) => {
    bcrypt_1.default.compare(req.body.password, process.env.ADMIN_HASH, (err, result) => {
        console.log(result);
        if (err)
            res.sendStatus(401);
        else if (!result)
            res.sendStatus(401);
        else {
            jsonwebtoken_1.default.sign({ permissions: ["ADMIN"] }, process.env.JWT_KEY, (err, token) => {
                if (err)
                    res.sendStatus(500);
                else {
                    res.cookie("secureCookie", token, {
                        // secure: true,
                        // httpOnly: true,
                        expires: (0, dayjs_1.default)().add(1, "days").toDate(),
                    });
                    res.cookie("showAllButtons", "true", {
                        expires: (0, dayjs_1.default)().add(1, "days").toDate(),
                    });
                    res.redirect("/");
                }
            });
        }
    });
});
app.get("/cookies", (req, res) => {
    res.json({ unsigned: req.cookies, signed: req.signedCookies });
});
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
