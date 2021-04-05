const axios = require("axios");

const post = async (item) => {
  let final = item;
  await axios.post(
    "https://evron-dev-blog-default-rtdb.firebaseio.com/newPosts.json",
    final
  );
};

export default post;
