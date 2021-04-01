import "../styles/globals.css";
import MainContextProvider from "../Context/context";
import ChronContextProvider from "../Context/chronContext";

function MyApp({ Component, pageProps }) {
  return (
    <MainContextProvider>
      <ChronContextProvider>
        <Component {...pageProps} />
      </ChronContextProvider>
    </MainContextProvider>
  );
}

export default MyApp;
