import { type AppType } from "next/app";
import { api } from "@/utils/api";
import "@/styles/globals.css";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { ClientToken } from "@/utils/client-token";
import { Typography } from "@mui/material";

const MyApp: AppType = ({ Component, pageProps }) => {
  const url = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  useEffect(() => {
    if (url !== "/login") {
      const token = ClientToken.get();
      if (!token) {
        router.push(`/login?cb=${url}`).catch((_) => null);
      } else {
        if (searchParams.get("reload") === "true") {
          router
            .push(url)
            .then((ok) => (ok ? router.reload() : null))
            .catch((_) => null);
        }
      }
    }
  }, [router, url, searchParams]);
  return (
    <>
      <Component {...pageProps} />
      <Typography variant="subtitle2" sx={{ textAlign: "right"}}>Made by Tobani Esan-George.</Typography>
    </>
  );
};

export default api.withTRPC(MyApp);
