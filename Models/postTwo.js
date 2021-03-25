import mongoose, { models } from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    year: {
      type: Number,
      required: true,
    },
    month: {
      type: Number,
      required: true,
    },
    day: {
      type: Number,
      required: true,
    },
  },
  mainImg: {
    type: String,
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

export default models.Post || mongoose.model("Post", postSchema);
