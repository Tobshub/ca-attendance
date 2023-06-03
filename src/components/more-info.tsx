import {
  AppBar,
  Box,
  Container,
  Dialog,
  IconButton,
  Slide,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { type TransitionProps } from "@mui/material/transitions";
import CloseIcon from "@mui/icons-material/Close";
import * as React from "react";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";

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
        present: { date: Date; id: number }[];
      }
    | undefined;
  services: { date: Date; id: number }[];
}

export const MoreMemberInfo = ({
  memberInfo,
  handleClose,
  open,
  services,
}: MoreMemberInfoProps) => {
  const localHandleClose = () => {
    handleClose();
  };

  // prettier-ignore
  const COLUMNS: GridColDef[] = React.useMemo(
    () => [
      { field: "id", width: 148, headerName: "Service Date" },
      { field: "present", width: 148, headerName: "Present", type: "boolean"}
    ],
    []
  );

  if (!memberInfo) {
    return null;
  }

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
      <Container
        sx={{
          mt: 4,
          display: "flex",
          gap: 3,
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "1rem",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Box sx={{ my: 2 }}>
            Full Name:
            <Typography variant="h5">{memberInfo.name}</Typography>
            <Typography variant="subtitle1">
              Sex: {memberInfo.sex === "MALE" ? "M" : "F"}
            </Typography>
          </Box>
          <TextField
            disabled
            aria-readonly
            value={memberInfo.phoneNum}
            label="Phone No."
          />
          <TextField
            disabled
            aria-readonly
            value={memberInfo.address}
            multiline
            label="Address"
          />
        </div>
        <div style={{ width: 300 }}>
          <DataGrid
            density="compact"
            rows={services.map((service) => ({
              id: service.date.toLocaleDateString("en-GB"),
              present: !!memberInfo.present.find(({ id }) => id === service.id),
            }))}
            columns={COLUMNS}
            initialState={{
              pagination: { paginationModel: { page: 0, pageSize: 10 } },
            }}
            pageSizeOptions={[10]}
          />
        </div>
      </Container>
    </Dialog>
  );
};
