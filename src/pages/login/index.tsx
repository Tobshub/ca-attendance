import { type NextPage } from "next";
import styles from "./login.module.css";
import Head from "next/head";
import {
  Box,
  Button,
  CircularProgress,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import { green } from "@mui/material/colors";
import { api } from "@/utils/api";
import { type FormEvent, useState } from "react";
import { ClientToken } from "@/utils/client-token";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";

const Login: NextPage = () => {
  const router = useRouter();
  const goTo = useSearchParams().get("cb");
  const loginMut = api.auth.login.useMutation({
    onSuccess: (data) => {
      if (data.ok) {
        ClientToken.set(data.value);
        console.log(goTo);
        router.push(goTo ?? "/").catch((_) => null);
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
    await loginMut.mutateAsync(data).catch((_) => null);
  };
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <main className={styles.main}>
        <h1>Login</h1>
        <form
          className={styles.form}
          onSubmit={(e) => {
            handleSubmit(e).catch(_ => null);
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
          <Box sx={{ m: 1, position: "relative", width: "fit-content" }}>
            <Button
              variant="contained"
              type="submit"
              disabled={loginMut.isLoading}
              sx={loginMut.isSuccess ? { bgcolor: green[500] } : undefined}
            >
              SUBMIT
            </Button>
            {loginMut.isLoading && (
              <CircularProgress
                size={24}
                sx={{
                  color: green[500],
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-12px",
                  marginLeft: "-12px",
                }}
              />
            )}
          </Box>
        </form>
      </main>
    </>
  );
};

export default Login;
