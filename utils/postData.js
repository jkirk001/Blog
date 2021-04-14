const axios = require("axios");

const post = async (item) => {
  try {
    let final = item;
    await axios.post(
      `https://evron-dev-blog-default-rtdb.firebaseio.com/newPosts.json`,
      final
    );
  } catch (e) {
    console.log(e);
  }
};

export default post;
