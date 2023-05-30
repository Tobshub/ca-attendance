import * as React from "react";
import styles from "./components.module.css";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { type TransitionProps } from "@mui/material/transitions";
import DialogActions from "@mui/material/DialogActions";
import {
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from "@mui/material";
import LoadingButton from "./loading-btn";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface FullScreenDialogProps {
  open: boolean;
  handleClose: () => void;
  addMember: (data: {
    name: string;
    address?: string;
    phoneNum: string;
    sex: "MALE" | "FEMALE";
  }) => Promise<boolean>;
  mutation: { isLoading: boolean; isError: boolean; isSuccess: boolean };
}

export default function FullScreenDialog({
  open,
  handleClose,
  addMember,
  mutation: { isSuccess, isError, isLoading },
}: FullScreenDialogProps) {
  const [useMutationState, setUseMutationState] = React.useState(true);
  const dialogFormRef = React.useRef<HTMLFormElement>(null);
  const resetFormBtnRef = React.useRef<HTMLButtonElement>(null);
  const localHandleClose = () => {
    setUseMutationState(false);
    handleClose();
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUseMutationState(true);
    const form = dialogFormRef.current;
    if (form) {
      const formData = new FormData(form);
      const data = {
        name: `${formData.get("lname")?.toString()?.trim() ?? ""} ${
          formData.get("fname")?.toString()?.trim() ?? ""
        }`,
        address: formData.get("address")?.toString(),
        phoneNum: formData.get("phoneNum")?.toString() ?? "",
        sex: (formData.get("sex")?.toString() ?? "MALE") as "MALE" | "FEMALE",
      };
      addMember(data)
        .then((isSuccess) => {
          if (isSuccess) {
            resetFormBtnRef.current?.click();
          }
        })
        .catch((_) => null);
    }
  };
  return (
    <div>
      <Snackbar
        open={useMutationState && (isSuccess || isError)}
        autoHideDuration={5000}
        onClose={() => setUseMutationState(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={() => setUseMutationState(false)}
          severity={isSuccess ? "success" : "error"}
        >
          {isSuccess ? "New Member Added" : "Failed to add Member"}
        </Alert>
      </Snackbar>
      <Dialog
        fullScreen
        open={open}
        onClose={localHandleClose}
        TransitionComponent={Transition}
        sx={{ maxWidth: 1000, marginInline: "auto" }}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar sx={{ display: "flex", flexWrap: "wrap" }}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={localHandleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography
              sx={{ ml: 2, flex: 1, minWidth: "fit-content" }}
              variant="h6"
              component="div"
            >
              Add a new Member to the attendance list
            </Typography>
            <DialogActions>
              <LoadingButton
                variant={
                  useMutationState
                    ? isSuccess
                      ? "contained"
                      : "outlined"
                    : "outlined"
                }
                onClick={handleSubmit}
                isLoading={isLoading}
                isSuccess={isSuccess}
                isError={isError}
                useMutationState={useMutationState}
                color="inherit"
              >
                Add Member
              </LoadingButton>
            </DialogActions>
          </Toolbar>
        </AppBar>
        <form
          className={styles.dialog_form}
          ref={dialogFormRef}
          onSubmit={handleSubmit}
        >
          <TextField
            required
            autoFocus
            label="First Name"
            name="fname"
            variant="outlined"
            disabled={isLoading}
          />
          <TextField
            required
            label="Last Name"
            name="lname"
            variant="outlined"
            disabled={isLoading}
          />
          <TextField
            required
            label="Phone Number"
            name="phoneNum"
            inputMode="numeric"
            type="number"
            variant="outlined"
            disabled={isLoading}
          />
          <TextField
            label="Address"
            name="address"
            variant="standard"
            disabled={isLoading}
          />
          <button
            type="reset"
            ref={resetFormBtnRef}
            style={{ visibility: "hidden" }}
          />
          <FormControl sx={{ minWidth: 80 }}>
            <InputLabel>Sex</InputLabel>
            <Select
              label="Sex"
              name="sex"
              defaultValue={""}
              disabled={isLoading}
            >
              <MenuItem value="MALE">Male</MenuItem>
              <MenuItem value="FEMALE">Female</MenuItem>
            </Select>
          </FormControl>
        </form>
      </Dialog>
    </div>
  );
}
