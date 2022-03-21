import mongoose from "mongoose";
import { marked } from "marked";
import createDomPurifier from "dompurify";
import { JSDOM } from "jsdom";

// @ts-ignore
const dompurify = createDomPurifier(new JSDOM().window);

const articleSchema = new mongoose.Schema({
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
    this.sanitizedHTML = dompurify.sanitize(marked(this.markdown));
  }
  next();
});

export = mongoose.model("Article", articleSchema);
