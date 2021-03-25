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
    title: "Using context to manage global state",
    date: {
      year: 2021,
      month: 7,
      day: 12,
    },
    mainImg: "test.jpg",
    quip:
      "You could use Redux, but for small projects there's no need to waste overhead",
    tags: ["React", "Javascript"],
    body: [
      {
        type: "p",
        content:
          "State is an amazing tool when it comes to building a dynamic webpage. Particularly now that React hooks allow us to break our state into small manageable pieces.",
        order: 1,
      },
      {
        type: "p",
        content:
          "But what if you need your state to persist across your entire component tree?",
        order: 2,
      },
      {
        type: "p",
        content:
          "Once, we would have used a tool like Redux, but for smaller projects there’s no need to add the overhead. If you're only managing a reasonably small amount of state, lets say light-mode/dark-mode, React context is the way.",
        order: 3,
      },
      {
        type: "p",
        content: "Let’s take a look at my resume-esque webpage as an example.",
        order: 4,
      },
      { type: "img", content: "/light-dark.png", order: 5 },
      {
        type: "p",
        content:
          "It doesn’t seem like much, but very little is actually changing — maybe 4 or 5 CSS properties have to change to make sure the text is legible. But that’s beyond the scope of this article. To make this change, and to make sure the change is instantly available to all components, I managed the state in context. So clicking on the logo in the top left, leads to a change that instantly applies to every component (that imports the context) the page.",
        order: 6,
      },
      {
        type: "p",
        content:
          "In your root folder, make a folder named context and within it a file which contains your context — for the example, “context.js”.",
        order: 7,
      },
      {
        type: "code",
        content: `  import React, { useState, useEffect } from "react";

            // Initiates the context
            export const ModeContext = React.createContext({
              lightMode: false,
              switch: () => {},
            });
            const ModeContextProvider = (props) => {
          
              // Sets the state within the context
              const [isLightMode, setLightMode] = useState(false);
          
              // Sets the state property LightMode to the opposite of its current state
              const switchHandler = () => {
                setLightMode(!isLightMode);
              };
            
              return (
                  // Sets the ModeContext which we will then wrap our App with, making it available to any component
                <ModeContext.Provider
                  value={{
                    lightMode: isLightMode,
                    switch: switchHandler,
                  }}
                >
                {/*Represents the Root App component we will be wrapping with context*/}
                  {props.children}
                </ModeContext.Provider>
              );
            };
            
            export default ModeContextProvider;`,
        order: 8,
      },
      {
        type: "p",
        content: "Let’s take a look at my resume-esque webpage as an example.",
        order: 9,
      },
      {
        type: "code",
        content: `
        import React from "react";
        import ReactDOM from "react-dom";
        import "./index.css";
        import App from "./App";
        
        // Here we import the provider from the context we just made
        import ModeContextProvider from "./context/mode-context";
        
        // And in out ReactDOM.render we wrap the root component in the Provider
        ReactDOM.render(
          <ModeContextProvider>
              <App />
          </ModeContextProvider>,
          document.getElementById("root")
        );
        // Eh voila, the context is now globally available to call in any component`,
        order: 10,
      },
      {
        type: "p",
        content:
          "From this point on, the context can be consumed anywhere in the App. State can now be set anywhere in your component. Check below to see an example of how to call the context.",
        order: 11,
      },
      {
        type: "code",
        content: `
import { useEffect } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Main from "./components/Main/Main";

// Here we get the useContext hook from React
import { useContext } from "react";
// And here we grab the context we create first in the context.js
// which is then filled in and wrapped around the root component
import { ModeContext } from "./context/mode-context";

function App() {
  useEffect(() => {
    document.title = "Available";
  }, []);

  // Here we use the useContext hook and ask it bring in the context we set
  const modeContext = useContext(ModeContext);


  return (
      {/* And here we use the context to see what lightMode state is set to
          Remeber, functions can be passed this way aswell
        eg switchHandler() is passed through as mainContext.switch */}
    <div className={modeContext.lightMode ? "AppLight" : "App"}>
      <Switch>
        <Route path="/" component={Main} />
      </Switch>
    </div>
  );
}

export default App;`,
        order: 12,
      },
      {
        type: "p",
        content:
          "And now you have working context! Funny enough Redux uses context to accomplish it's goals. And while I'm still a fairly fresh developer I see this question all the time, it seems to me that Redux is not context, although it uses context. Tools such as Redux and Redux toolkit are powerful, tested patterns for handling global state. Context is just an efficient way to move data.",
        order: 13,
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
  let finalItems = [item, item];
  Post.insertMany(finalItems)
    .then(() => console.log("Success"))
    .catch((e) => console.log("failure"));
};

feed();
