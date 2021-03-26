const mongoose = require("mongoose");
const Schema = mongoose.Schema;

async function dbConnect() {
  // check if we have a connection to the database or if it's currently
  // connecting or disconnecting (readyState 1, 2 and 3)
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  return mongoose
    .connect("mongodb://localhost:27017/blog-two", {
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
  const item = {
    title: "Building statically rendered pages with Next",
    date: {
      year: 2020,
      month: 4,
      day: 21,
    },
    mainImg: "serverSide.jpg",
    quip: "SR, ISR, CSR, SSR, so many choices!",
    tags: ["React", "Javascript", "Next"],
    body: [
      {
        type: "p",
        content:
          "While React is great, sometimes putting the burden on the user can make our pages seem unresponsive or skew our SEO optimization.",
        order: 1,
      },
      {
        type: "p",
        content:
          "So, if you’re planning to make a site with lots of HTTPRequests yet you would like the data from those calls available from the moment the server sends the page to the user, therefore allowing more precise SEO optimization and faster load times for users.",
        order: 2,
      },
      {
        type: "p",
        content:
          "Next statically renders all pages that it can with no configuration. This post will cover how to set up a static page that requires fetched data with Next ( which with React we would otherwise do on the client, and can still be done within Next ). React also allows for Incremental Static Rendering (ISR) and Server Side Rendering (SSR) but those will be covered in another post.",
        order: 3,
      },
      {
        type: "p",
        content:
          "Below is an example of a normal React App fetching data and populating the page.",
        order: 4,
      },
      {
        type: "code",
        content: `
import React, {useEffect, useState} from "react";

const Sample =(props)=> {
    const [data, setData] = useState();

    useEffect(()=>{
        fetch("https://test.test/api")
        .then((res)=> {
            return res.json();
        })
        .then((resData)=>{
            setData(resData);
        })
    }, [])

    let display = <h1> ...Loading...</h1>

    if (data) {
        display = <h1>{data.title}</h1>
    }

    return (
        <div>{display}</div>
    )
}

export default Sample;`,
        order: 5,
      },
      {
        type: "p",
        content:
          "Now doing this is fine in most instances, but as stated before, the user has to wait as the client fetches the data and converts it to a JS object from JSON, sets it as state, then re-renders. All of this logic can be done on the server, saving resources.",
        order: 6,
      },
      {
        type: "p",
        content:
          "The other issue with React pages is they send a blank page with only one predefined <head> and an empty root element. That means that search engine crawlers won’t be able to access the specifics on your page. Essentially, if you need to be found via search engine, you’re going to have a hard time.",
        order: 7,
      },
      {
        type: "p",
        content:
          "Now with Next we just have to make a few modifications but we can avoid the issue entirely.",
        order: 8,
      },
      {
        type: "code",
        content: `import React, {useEffect, useState} from "react";

        const Sample =(props)=> {
            return (
                <div><h1>{props.post.title}</h1></div>
            )
        }
        
        export async function getStaticProps() {
          const data = await fetch("https://test.test/api");
          const finalData = await data.json();
          return {
            props: {
              posts: finalData,
            },
          };
        }
        
        
        export default Sample;
        `,
        order: 9,
      },
      {
        type: "p",
        content:
          "The key ingredient here is 'export async function getStaticProps() {}'  . It must be typed exactly like that.",
        order: 10,
      },
      {
        type: "p",
        content:
          "Anything within that async function is run on the server, before the page loads, so it can provide the user content instantly with no lag as it fetches data. The page will also come filled with data, rather than an empty root that is then filled on the client side. ",
        order: 11,
      },
      {
        type: "p",
        content:
          "And you must return your data as an object return {props: { posts: finalData, other: otherData}}",
        order: 12,
      },

      {
        type: "p",
        content:
          "Below is are 2 sample of page sources — the first React, the second Next.",
        order: 13,
      },
      {
        type: "img",
        content: "/Next-react-source.png",
        order: 14,
      },
    ],
  };

  const postSchema = new Schema({
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

  const Post = mongoose.model("Post", postSchema);

  await dbConnect();
  let finalItems = [item];
  Post.insertMany(finalItems)
    .then(() => console.log("Success"))
    .catch((e) => console.log("failure"));
};

feed();
