import { type NextPage } from "next";
import styles from "./login.module.css";
import Head from "next/head";
import { FormControlLabel, Switch, TextField } from "@mui/material";
import { api } from "@/utils/api";
import { type FormEvent, useState, useEffect } from "react";
import { ClientToken } from "@/utils/client-token";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import LoadingButton from "@/components/loading-btn";

const Login: NextPage = () => {
  const router = useRouter();
  let goTo = useSearchParams().get("cb");
  const loginMut = api.auth.login.useMutation({
    onSuccess: (data) => {
      if (data.ok) {
        ClientToken.set(data.value);
        goTo = goTo ?? "/";
        router.push(`${goTo}?reload=true`).catch(() => null);
      }
    },
  });
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    };
    await loginMut.mutateAsync(data).catch(() => null);
  };
  const [showPassword, setShowPassword] = useState(false);

  const authMut = api.auth.verifyToken.useMutation();
  useEffect(() => {
    // delete token if invalid
    const token = ClientToken.get();
    if (token) {
      authMut
        .mutateAsync(token)
        .then((data) => {
          if (data.ok) {
            router.push(goTo ?? "/").catch(() => null);
          } else {
            ClientToken.remove();
          }
        })
        .catch(() => null);
    }
  }, []);
  return (
    <>
      <Head>
        <title>Calvary Assembly Ikoyi</title>
      </Head>
      <main className={styles.main}>
        <h1>Welcome. Please Login</h1>
        <form
          className={styles.form}
          onSubmit={(e) => {
            handleSubmit(e).catch(() => null);
          }}
        >
          <TextField
            label="Username"
            name="username"
            variant="outlined"
            required
            disabled={loginMut.isLoading}
          />
          <TextField
            label="Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            name="password"
            required
            disabled={loginMut.isLoading}
          />
          <FormControlLabel
            control={
              <Switch onChange={() => setShowPassword((state) => !state)} />
            }
            label="Show Password"
            labelPlacement="start"
          />
          <LoadingButton
            variant="contained"
            isLoading={loginMut.isLoading}
            isError={loginMut.isError}
            isSuccess={loginMut.isSuccess}
          >
            SUBMIT
          </LoadingButton>
        </form>
      </main>
    </>
  );
};

export default Login;
