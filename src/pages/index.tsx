import { Button } from "@mui/material";
import styles from "./index.module.css";
import { type NextPage } from "next";
import Head from "next/head";
import FullScreenDialog from "./components/fullscreen-dialog";
import { useState } from "react";
import { api } from "@/utils/api";

const UseAddMember = (
  mutationOptions: Parameters<typeof api.member.new.useMutation>[0]
) => {
  const [addMemberDialogOpen, setAddMemberDialogOpen] = useState(false);
  const addMemberMut = api.member.new.useMutation(mutationOptions);
  const addMember = async (data: {
    name: string;
    address?: string;
    phoneNum: string;
    sex: "MALE" | "FEMALE";
  }) => {
    const success = await addMemberMut
      .mutateAsync(data)
      .then((data) => data.ok)
      .catch((_) => false);
    return success;
  };
  return {
    addMemberDialogOpen,
    setAddMemberDialogOpen,
    addMemberMut,
    addMember,
  };
};

const Home: NextPage = () => {
  const {
    addMemberDialogOpen,
    setAddMemberDialogOpen,
    addMemberMut,
    addMember,
  } = UseAddMember({});
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
          mutation={addMemberMut}
        />
      </main>
    </>
  );
};

export default Home;
