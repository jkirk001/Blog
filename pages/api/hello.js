// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import dbConnect from "../../utils/db-connect-new";
import Blog from "../../Models/blogpost";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const body = JSON.parse(req.body);
    await dbConnect();
    Blog.insertMany(body)
      .then(() => console.log("Success"))
      .catch((e) => console.log("failure"));
    return res.json({ message: "successlol" });
  }
  if (req.method === "GET") {
    await dbConnect();
    const blogs = await Blog.find({});
    return res.json(blogs);
  }
  return res.json({ message: "hi" });
};
export default handler;
