import {
  AppBar,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Slide,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { type TransitionProps } from "@mui/material/transitions";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import * as React from "react";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { api } from "@/utils/api";
import LoadingButton from "./loading-btn";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface DisplayMemberInfoProps {
  memberInfo: NonNullable<MoreMemberInfoProps["memberInfo"]>;
}

const DisplayMemberInfo = ({ memberInfo }: DisplayMemberInfoProps) => {
  return (
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
  );
};

interface MoreMemberInfoProps {
  open: boolean;
  handleClose: () => void;
  memberInfo:
    | {
        id: number;
        name: string;
        phoneNum: string;
        address: string | null;
        sex: "MALE" | "FEMALE";
        present: { date: Date; id: number }[];
      }
    | undefined;
  services: { date: Date; id: number }[];
  refetchMembers: () => Promise<void>;
}

// TODO: show alerts when member is edited or deleted
export const MoreMemberInfo = ({
  memberInfo,
  handleClose,
  open,
  services,
  refetchMembers,
}: MoreMemberInfoProps) => {
  const [useMutationState, setUseMutationState] = React.useState(false);
  const localHandleClose = () => {
    setUseMutationState(false);
    handleClose();
  };

  const [isEditMode, setIsEditMode] = React.useState(false);
  const editInfoFormRef = React.useRef<HTMLFormElement>(null);
  const editMemberMut = api.member.update.useMutation();

  const handleSave = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (editInfoFormRef.current && memberInfo) {
      setUseMutationState(true);
      const formData = new FormData(editInfoFormRef.current);
      const data = {
        name: formData.get("name")?.toString(),
        address: formData.get("address")?.toString(),
        phoneNum: formData.get("phoneNum")?.toString(),
        sex: formData.get("sex")?.toString() as "MALE" | "FEMALE" | undefined,
      };
      editMemberMut
        .mutateAsync({ id: memberInfo.id, data })
        .then((data) => {
          if (data.ok && memberInfo) {
            memberInfo = { ...data.value, present: memberInfo.present };
            refetchMembers().catch(() => null);
            setIsEditMode(false);
          }
        })
        .catch(() => null);
    }
  };

  const COLUMNS: GridColDef[] = React.useMemo(
    () => [
      { field: "id", width: 148, headerName: "Service Date" },
      { field: "present", width: 148, headerName: "Present", type: "boolean" },
    ],
    []
  );

  const [deleteMemberDialogOpen, setDeleteMemberDialogOpen] =
    React.useState(false);
  const deleteMemberMut = api.member.delete.useMutation({
    onSuccess: (data) => {
      if (data.ok) {
        refetchMembers().then(() => {
          localHandleClose();
        }).catch(() => null)
      }
    },
  });

  const handleMemberDelete = () => {
    if (memberInfo) {
      deleteMemberMut.mutate({ id: memberInfo.id });
    }
  };

  if (!memberInfo) {
    return null;
  }

  return (
    <Dialog
      keepMounted={false}
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
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            {isEditMode ? (
              <>
                <LoadingButton
                  color="success"
                  variant="contained"
                  useMutationState={useMutationState}
                  isLoading={editMemberMut.isLoading}
                  isError={editMemberMut.isError}
                  isSuccess={editMemberMut.isSuccess}
                  sx={{ m: 0 }}
                  onClick={handleSave}
                >
                  SAVE
                </LoadingButton>
                <Button
                  color="error"
                  variant="contained"
                  onClick={() => setIsEditMode(false)}
                >
                  CANCEL
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => setIsEditMode(true)}
                  color="info"
                  variant="contained"
                >
                  EDIT
                </Button>
                <IconButton
                  color="error"
                  onClick={() => setDeleteMemberDialogOpen(true)}
                >
                  <DeleteIcon />
                </IconButton>
              </>
            )}
          </Box>
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
        {isEditMode ? (
          <form
            style={{
              display: "flex",
              gap: "1rem",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
            ref={editInfoFormRef}
            onSubmit={handleSave}
          >
            <TextField
              label="Full Name"
              name="name"
              defaultValue={memberInfo.name}
            />
            <FormControl sx={{ minWidth: 80 }}>
              <InputLabel>Sex</InputLabel>
              <Select label="Sex" name="sex" defaultValue={memberInfo.sex}>
                <MenuItem value="MALE">Male</MenuItem>
                <MenuItem value="FEMALE">Female</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Phone No."
              name="phoneNum"
              defaultValue={memberInfo.phoneNum}
            />
            <TextField
              multiline
              label="Address"
              name="address"
              defaultValue={memberInfo.address}
            />
          </form>
        ) : (
          <DisplayMemberInfo memberInfo={memberInfo} />
        )}
        <div style={{ width: 300 }}>
          <DataGrid
            density="compact"
            rows={services.map((service) => ({
              id: service.date.toLocaleDateString("en-GB"),
              present: !!memberInfo?.present.find(
                ({ id }) => id === service.id
              ),
            }))}
            columns={COLUMNS}
            initialState={{
              pagination: { paginationModel: { page: 0, pageSize: 10 } },
            }}
            pageSizeOptions={[10]}
          />
        </div>
      </Container>
      <Dialog
        open={deleteMemberDialogOpen}
        onClose={() => setDeleteMemberDialogOpen(false)}
      >
        <DialogTitle>Remove Member</DialogTitle>
        <DialogContent>
          You are attempting to remove {memberInfo.name} as a member.
          <br /> If you are sure, tap the confirm <strong>CONFIRM</strong>{" "}
          button.
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="warning" onClick={() => setDeleteMemberDialogOpen(false)}>
            CANCEL
          </Button>
          <LoadingButton
            onClick={handleMemberDelete}
            {...deleteMemberMut}
            useMutationState={true}
            color="error"
            variant="contained"
          >
            REMOVE
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Dialog>
  );
};
