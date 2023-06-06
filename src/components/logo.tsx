import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import Image from "next/image";
import rccgLogo from "@/assets/rccg-logo.png";
import { ClientToken } from "@/utils/client-token";
import { useRouter } from "next/router";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";

interface SignoutDialogProps {
  open: boolean;
  close: () => void;
}

const SignoutDialog = ({ open, close }: SignoutDialogProps) => {
  const router = useRouter();
  const handleSignOut = () => {
    ClientToken.remove();
    router.push("/login").catch(() => null);
  };

  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle>Signing Out?</DialogTitle>
      <DialogContent>
        You are attempting to sign out.
        <br /> If this is intentional tap the <strong>CONFIRM</strong> button.
      </DialogContent>
      <DialogActions>
        <Button color="warning" variant="outlined" onClick={close}>
          CANCEl
        </Button>
        <Button color="error" variant="contained" onClick={handleSignOut}>
          CONFIRM
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const HeaderWithLogo = () => {
  const [signOutConfirmDialogOpen, setSignOutConfirmDialogOpen] =
    useState(false);
  return (
    <>
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
            <IconButton
              color="error"
              onClick={() => setSignOutConfirmDialogOpen(true)}
            >
              <LogoutIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <SignoutDialog
        open={signOutConfirmDialogOpen}
        close={() => setSignOutConfirmDialogOpen(false)}
      />
    </>
  );
};
