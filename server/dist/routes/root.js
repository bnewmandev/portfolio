"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const portfolioData_json_1 = __importDefault(require("../portfolioData.json"));
const router = express_1.default.Router();
router.get("/", (req, res) => {
    res.render("index", { items: portfolioData_json_1.default });
    console.log(portfolioData_json_1.default);
});
module.exports = router;
