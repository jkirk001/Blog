import "../styles/globals.css";
import MainContextProvider from "../Context/context";

function MyApp({ Component, pageProps }) {
  return (
    <MainContextProvider>
      <Component {...pageProps} />
    </MainContextProvider>
  );
}

export default MyApp;
