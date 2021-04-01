import mongoose from "mongoose";

async function dbConnect() {
  // check if we have a connection to the database or if it's currently
  // connecting or disconnecting (readyState 1, 2 and 3)
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  return mongoose
    .connect("mongodb://localhost:27017/blog-almost", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
      //maxIdleTimeMS: 1000,
      //serverSelectionTimeoutMS: 1000,
      //socketTimeoutMS: 2000,
    })
    .then(console.log("open and connected"));
}

export default dbConnect;
