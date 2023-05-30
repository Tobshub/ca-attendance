import * as React from "react";
import styles from "./components.module.css";
import Button from "@mui/material/Button";
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
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

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
  }) => void;
}

export default function FullScreenDialog({
  open,
  handleClose,
  addMember,
}: FullScreenDialogProps) {
  const dialogFormRef = React.useRef<HTMLFormElement>(null);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = dialogFormRef.current;
    if (form) {
      const formData = new FormData(form);
      const data = {
        name: `${formData.get("lname")?.toString() ?? ""} ${
          formData.get("fname")?.toString() ?? ""
        }`,
        address: formData.get("address")?.toString(),
        phoneNum: formData.get("phoneNum")?.toString() ?? "",
        sex: (formData.get("sex")?.toString() ?? "MALE") as "MALE" | "FEMALE",
      };
      addMember(data);
    }
  };
  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar sx={{ display: "flex", flexWrap: "wrap" }}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
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
              <Button variant="outlined" color="inherit" onClick={handleSubmit}>
                Add Member
              </Button>
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
          />
          <TextField
            required
            label="Last Name"
            name="lname"
            variant="outlined"
          />
          <TextField
            required
            label="Phone Number"
            name="phoneNum"
            inputMode="numeric"
            type="number"
            variant="outlined"
          />
          <TextField label="Address" name="address" variant="standard" />
          <FormControl sx={{ minWidth: 80 }}>
            <InputLabel>Sex</InputLabel>
            <Select label="Sex" name="sex" defaultValue={""}>
              <MenuItem value="MALE">Male</MenuItem>
              <MenuItem value="FEMALE">Female</MenuItem>
            </Select>
          </FormControl>
        </form>
      </Dialog>
    </div>
  );
}
