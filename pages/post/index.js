import { useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import axios from "axios";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (localStorage.getItem(process.env.cookie) === process.env.secret)
      return router.push("/post/postArticle");
  }, []);

  const inputHandler = (e) => {
    e.target.id === "email"
      ? setEmail(e.target.value)
      : setPassword(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    axios
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.post}`,
        { email, password, returnSecureToken: true }
      )
      .then((res) => {
        console.log(res);
        localStorage.setItem(process.env.cookie, res.data.localId);
        localStorage.setItem("cookieId", res.data.idToken);
        localStorage.setItem("cookieRefresh", res.data.refreshToken);
        router.push("/post/postArticle");
      })
      .catch((error) => console.log(error));
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
    </Layout>
  );
};

export default Login;
