"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const project_1 = __importDefault(require("../models/project"));
const router = express_1.default.Router();
router.get("/", (req, res) => {
<<<<<<< HEAD
    project_1.default.find().then((result) => {
        res.render("index", { projects: result });
    });
=======
    res.render("index", { items: portfolioData_json_1.default });
>>>>>>> master
});
module.exports = router;
