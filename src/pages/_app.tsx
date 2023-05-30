import { type AppType } from "next/app";
import { api } from "@/utils/api";
import "@/styles/globals.css";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { ClientToken } from "@/utils/client-token";

const MyApp: AppType = ({ Component, pageProps }) => {
  const url = usePathname();
  const router = useRouter();
  useEffect(() => {
    if (url !== "/auth") {
      const token = ClientToken.get();
      if (!token) {
        router.push(`/login?cb=${url}`);
      }
    }
  }, []);
  return <Component {...pageProps} />;
};

export default api.withTRPC(MyApp);
