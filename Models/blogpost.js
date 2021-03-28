import mongoose, { models } from "mongoose";

const blogSchema = new mongoose.Schema({
  author: {
    name: String,
    date: { type: Date, default: Date.now() },
    read: Number,
  },
  title: {
    type: String,
    required: true,
  },
  quip: {
    type: String,
  },
  tags: {
    type: Array,
  },
  body: {
    type: Array,
  },
});

export default models.Blog || mongoose.model("Blog", blogSchema);
