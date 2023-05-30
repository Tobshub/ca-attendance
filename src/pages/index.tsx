import { Button } from "@mui/material";
import styles from "./index.module.css";
import { type NextPage } from "next";
import Head from "next/head";
import FullScreenDialog from "./components/fullscreen-dialog";
import { useState } from "react";

const Home: NextPage = () => {
  const [addMemberDialogOpen, setAddMemberDialogOpen] = useState(false);
  const addMember = (data: {
    name: string;
    address?: string;
    phoneNum: string;
    sex: "MALE" | "FEMALE";
  }) => {
    console.log(data);
  };
  return (
    <>
      <Head>
        <title>Calvary Assembly Ikoyi</title>
        <meta name="description" content="Mark church members attendance" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Button
          variant="contained"
          onClick={() => setAddMemberDialogOpen(true)}
        >
          ADD MEMBERS
        </Button>
        <FullScreenDialog
          open={addMemberDialogOpen}
          handleClose={() => setAddMemberDialogOpen(false)}
          addMember={addMember}
        />
      </main>
    </>
  );
};

export default Home;
