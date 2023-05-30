import styles from "./index.module.css";
import { type NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Calvary Assembly Ikoyi</title>
        <meta name="description" content="Mark church members attendance" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}></main>
    </>
  );
};

export default Home;
