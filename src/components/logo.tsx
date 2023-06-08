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
import CloseIcon from "@mui/icons-material/Close";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
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
  const [docsDialogOpen, setDocsDialogOpen] = useState(false);
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
            <Box>
              <IconButton
                color="secondary"
                onClick={() => setDocsDialogOpen(true)}
              >
                <QuestionMarkIcon />
              </IconButton>
              <IconButton
                color="error"
                onClick={() => setSignOutConfirmDialogOpen(true)}
              >
                <LogoutIcon />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <SignoutDialog
        open={signOutConfirmDialogOpen}
        close={() => setSignOutConfirmDialogOpen(false)}
      />
      <DocsDialog
        open={docsDialogOpen}
        close={() => setDocsDialogOpen(false)}
      />
    </>
  );
};

interface DocsDialogProps {
  open: boolean;
  close: () => void;
}

function DocsDialog({ open, close }: DocsDialogProps) {
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={close}
      sx={{ maxWidth: 800, mx: "auto" }}
    >
      <AppBar>
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography>How to Use</Typography>
            <IconButton color="error" onClick={close}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <DialogContent>
        <h3>Add a member</h3>
        <p>
          {`To add a member, simple click the "ADD MEMBERS" button on the home
          page. In the modal that opens up, fill in the required information and
          then click "ADD MEMBER" in the open modal.`}
        </p>
        <p>
          An alert at the bottom of your screen will let you know if the member
          was added successfully.
        </p>
        <h3>Create a Service</h3>
        <p>
          To be able to mark attendance for a particular day, you need to create
          a service on that day.
        </p>
        <p>
          {`To do that, simply click the "CREATE SERVICE" button on the home page.
          In the modal that opens up, pick the date of the service and
          optionally fill in the service name. Finally, click the "CREATE
          SERVICE" button in the modal.`}
        </p>
        <p>
          An alert at the bottom of your screen will let you know if the service
          was created successfully.
        </p>
        <p>
          Note that the data table on the home page only shows the four most
          recent services, to be convice. So if your previous services no longer
          show there, or an older service you added is not shown, rest assured
          it is still available.
        </p>
        <h3>Mark Attendance</h3>
        <p>
          To mark attendance, simply select the member(s) you want to mark as
          present.
        </p>
        <p>
          {`When the member(s) is/are selected, the "MARK SELECTED AS PRESENT"
          button on the home page will become enabled. Click it and in the
          pop-up, select the date of the service to mark the members present
          for.`}
        </p>
        <p>
          {`If you mistakenly marked any member(s) as present, the "MARK SELECTED
          AS ABSENT" will help you undo that.`}
        </p>
        <p>
          For both actions, an alert at bottom of your screen will let you know
          if the action was successful.
        </p>
        <h3>More Info</h3>
        <p>
          To preserve space and keep things clean, the data table only shows
          some of the member information (i.e. name, sex and attendance for the
          four most recent services).
        </p>
        <p>
          {`All member information, including their overall attendance, can be
          found on the member's more info page.`}
        </p>
        <p>
          {`To access the more info page of a member, simple right click (for
          desktop) or hold (for mobile) the member's row on the data table.`}
        </p>
        <p>
          {`From a member's more info page, their data can be edited by clicking
          the "EDIT" button, or the member can be deleted completely by clicking
          the delete (trash bin) icon.`}
        </p>
      </DialogContent>
    </Dialog>
  );
}
