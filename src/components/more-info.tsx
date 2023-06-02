import {
  AppBar,
  Dialog,
  IconButton,
  Slide,
  Toolbar,
  Typography,
} from "@mui/material";
import { type TransitionProps } from "@mui/material/transitions";
import CloseIcon from "@mui/icons-material/Close";
import * as React from "react";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface MoreMemberInfoProps {
  open: boolean;
  handleClose: () => void;
  memberInfo:
    | {
        name: string;
        phoneNum: string;
        address: string | null;
        sex: "MALE" | "FEMALE";
        present: { date: Date }[];
      }
    | undefined;
}

export const MoreMemberInfo = ({ handleClose, open }: MoreMemberInfoProps) => {
  const localHandleClose = () => {
    handleClose();
  };

  return (
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
            Member Info
          </Typography>
        </Toolbar>
      </AppBar>
    </Dialog>
  );
};
