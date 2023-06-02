import { AppBar, Toolbar, Typography } from "@mui/material";
import Image from "next/image";
import rccgLogo from "@/assets/rccg-logo.png";

export const HeaderWithLogo = () => {
  return (
    <AppBar>
      <Toolbar sx={{ gap: 2 }}>
        <Image src={rccgLogo} alt="RCCG Logo" width={32} height={32} />
        <Typography variant="h6">Calvary Assembly Ikoyi</Typography>
      </Toolbar>
    </AppBar>
  );
};
