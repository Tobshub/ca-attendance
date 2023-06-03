import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import Image from "next/image";
import rccgLogo from "@/assets/rccg-logo.png";
import { ClientToken } from "@/utils/client-token";
import { useRouter } from "next/router";

export const HeaderWithLogo = () => {
  const router = useRouter();
  const handleSignOut = () => {
    ClientToken.remove();
    router.push("/login").catch((_) => null);
  };
  return (
    <AppBar>
      <Toolbar sx={{ gap: 2 }}>
        <Image src={rccgLogo} alt="RCCG Logo" width={32} height={32} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography variant="body1">Calvary Assembly Ikoyi</Typography>
          <Button color="warning" variant="contained" onClick={handleSignOut}>
            SIGN OUT
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
