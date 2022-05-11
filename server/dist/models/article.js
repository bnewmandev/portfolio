"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mongoose_1 = __importDefault(require("mongoose"));
const marked_1 = require("marked");
const dompurify_1 = __importDefault(require("dompurify"));
const jsdom_1 = require("jsdom");
// @ts-ignore
const dompurify = (0, dompurify_1.default)(new jsdom_1.JSDOM().window);
const articleSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    markdown: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
    },
    sanitizedHTML: {
        type: String,
        required: true,
    },
});
articleSchema.pre("validate", function (next) {
    if (this.markdown) {
        this.sanitizedHTML = dompurify.sanitize((0, marked_1.marked)(this.markdown));
    }
    next();
});
module.exports = mongoose_1.default.model("Article", articleSchema);
//# sourceMappingURL=article.js.map