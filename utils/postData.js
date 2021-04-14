const axios = require("axios");

const post = async (item) => {
  try {
    let final = item;
    await axios.post(
      `${process.env.url}?auth=${localStorage.getItem("process.env.cookie")}`,
      final
    );
  } catch (e) {
    console.log(e);
  }
};

export default post;
