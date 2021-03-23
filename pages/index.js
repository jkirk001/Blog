import styles from "../styles/Home.module.css";
import Layout from "../Components/Layout/Layout";
import Search from "../Components/Search/Search";
import Recent from "../Components/Recent/Recent";

export default function Home() {
  return (
    <Layout>
      <Recent />
      <Search />
    </Layout>
  );
}
