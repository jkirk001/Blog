const mongoose = require("mongoose");
const Schema = mongoose.Schema;

async function dbConnect() {
  // check if we have a connection to the database or if it's currently
  // connecting or disconnecting (readyState 1, 2 and 3)
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  return mongoose
    .connect("mongodb://localhost:27017/blog", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
      maxIdleTimeMS: 1000,
      serverSelectionTimeoutMS: 1000,
      socketTimeoutMS: 2000,
    })
    .then(console.log("open and connected"));
}

const feed = async () => {
  const tags = ["next", "javascript", "react", "mongo"];
  const year = [2020, 2021];
  const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const day = [1, 3, 5, 7, 9, 11, 13, 15, 17];

  const fakePosts = [];

  for (let i = 0; i < 30; i++) {
    const id = String(i) + "id";
    let date = {
      year: year[Math.round(Math.random() * 1)],
      month: month[Math.round(Math.random() * 11)],
      day: day[Math.round(Math.random() * 8)],
    };
    let tag = tags[Math.floor(Math.random() * 4)];
    let post = {
      id: id,
      title: `${tag} test`,
      body:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Turpis massa tincidunt dui ut ornare lectus sit amet. Est lorem ipsum dolor sit amet. A scelerisque purus semper eget duis at tellus at. Et molestie ac feugiat sed lectus vestibulum mattis. Condimentum vitae sapien pellentesque habitant morbi tristique senectus et. Rutrum quisque non tellus orci ac auctor augue mauris augue. Molestie ac feugiat sed lectus. Quisque egestas diam in arcu cursus euismod quis viverra nibh. Nunc pulvinar sapien et ligula ullamcorper malesuada. Odio pellentesque diam volutpat commodo sed egestas egestas fringilla. Vel pharetra vel turpis nunc eget lorem dolor sed. Fermentum dui faucibus in ornare. Duis ultricies lacus sed turpis tincidunt. Orci porta non pulvinar neque. Augue eget arcu dictum varius. Consequat nisl vel pretium lectus quam id leo in. Tellus pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum. Aliquet risus feugiat in ante. Mi proin sed libero enim.",
      tag: tag,
      date: date,
    };
    fakePosts.push(post);
  }
  const postSchema = new Schema({
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    tag: {
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
  });

  const User = mongoose.model("Post", postSchema);

  await dbConnect();
  User.insertMany(fakePosts)
    .then(() => console.log("Success"))
    .catch((e) => console.log("failure"));
};

feed();
