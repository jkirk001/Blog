import { useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "./login.module.css";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [display, setDisplay] = useState(false);
  const [styleIn, setIn] = useState(null);

  useEffect(() => {
    if (localStorage.getItem(process.env.cookie) === process.env.secret)
      return router.push("/post/postArticle");
  }, []);

  useEffect(() => {
    if (styleIn === true) return;
    if (styleIn === false) {
      setTimeout(() => {
        setDisplay(false);
      }, 1000);
    }
  }, [styleIn]);

  const inputHandler = (e) => {
    e.target.id === "email"
      ? setEmail(e.target.value)
      : setPassword(e.target.value);
  };

  const displayHandler = () => {
    setDisplay(true);
    setIn(true);
  };

  const errorClassHandler = () => {
    setIn(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    axios
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.post}`,
        { email, password, returnSecureToken: true }
      )
      .then((res) => {
        localStorage.setItem(process.env.cookie, res.data.localId);
        localStorage.setItem("cookieId", res.data.idToken);
        localStorage.setItem("cookieRefresh", res.data.refreshToken);
        return router.push("/post/postArticle");
      })
      .catch((error) => {
        displayHandler();
      });
  };

  return (
    <Layout>
      <section>
        <h2>Login</h2>
        <form className="form" onSubmit={submitHandler}>
          <div className="email">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="email"
              onChange={inputHandler}
            />
          </div>
          <div className="password">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="password"
              onChange={inputHandler}
            />
          </div>
          <button>Submit</button>
        </form>
      </section>
      <div>
        {display ? (
          <div
            className={styleIn ? "error" : "errorOut"}
            style={{ color: "red", fontWeight: "bold" }}
          >
            Username or password was incorrect
            <span onClick={errorClassHandler}>&times;</span>
          </div>
        ) : null}
      </div>
    </Layout>
  );
};

export default Login;
