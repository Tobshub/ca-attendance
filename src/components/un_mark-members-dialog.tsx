import {
  Alert,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
} from "@mui/material";
import { useState } from "react";
import LoadingButton from "./loading-btn";

interface MarkMemberDialogProps {
  handleClose: () => void;
  handleMarkingMembers: (serviceId: number) => Promise<boolean>;
  open: boolean;
  selectedMembersCount: number;
  refetchMembers: () => void;
  services: { id: number; date: Date }[];
  mutation: { isSuccess: boolean; isError: boolean; isLoading: boolean };
}

export const MarkMembersDialog = ({
  handleClose,
  handleMarkingMembers,
  open,
  selectedMembersCount,
  refetchMembers,
  services,
  mutation: { isSuccess, isError, isLoading },
}: MarkMemberDialogProps) => {
  const [useMutationState, setUseMutationState] = useState(false);
  const localHandleClose = () => {
    setUseMutationState(false);
    handleClose();
  };
  return (
    <>
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
          {isSuccess
            ? "Marked members as present"
            : "Failed to mark members as present"}
        </Alert>
      </Snackbar>
      <Dialog open={open} onClose={localHandleClose}>
        <DialogTitle>
          Mark <strong>{selectedMembersCount}</strong> selected member(s) as
          present for Service on:
        </DialogTitle>
        <DialogContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setUseMutationState(true);
              const formData = new FormData(e.currentTarget);
              const _serviceId = formData.get("serviceId");
              if (_serviceId) {
                const serviceId = parseInt(_serviceId.toString());
                handleMarkingMembers(serviceId)
                  .then((isSuccess) => {
                    if (isSuccess) {
                      refetchMembers();
                      handleClose();
                    }
                  })
                  .catch((_) => null);
              }
            }}
          >
            <FormControl fullWidth variant="standard">
              <InputLabel>Service Date</InputLabel>
              <Select
                required
                label="Service Date"
                defaultValue={services[0]?.id ?? ""}
                name="serviceId"
              >
                {services
                  ? services.map((service) =>
                      service ? (
                        <MenuItem
                          value={service.id}
                          key={service.id}
                          defaultChecked={service.id === services[0]?.id}
                        >
                          {service.date.toLocaleDateString("en-GB")}
                        </MenuItem>
                      ) : null
                    )
                  : null}
              </Select>
            </FormControl>
            <LoadingButton
              variant="contained"
              isSuccess={isSuccess}
              isError={isError}
              isLoading={isLoading}
            >
              Mark Attendance
            </LoadingButton>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};


interface UnmarkMemberDialogProps {
  handleClose: () => void;
  handleUnmarkingMembers: (serviceId: number) => Promise<boolean>;
  open: boolean;
  selectedMembersCount: number;
  refetchMembers: () => void;
  services: { id: number; date: Date }[];
  mutation: { isSuccess: boolean; isError: boolean; isLoading: boolean };
}

export const UnmarkMembersDialog = ({
  handleClose,
  handleUnmarkingMembers,
  open,
  selectedMembersCount,
  refetchMembers,
  services,
  mutation: { isSuccess, isError, isLoading },
}: UnmarkMemberDialogProps) => {
  const [useMutationState, setUseMutationState] = useState(false);
  const localHandleClose = () => {
    setUseMutationState(false);
    handleClose();
  };
  return (
    <>
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
          {isSuccess
            ? "Marked members as absent"
            : "Failed to unmark members as absent"}
        </Alert>
      </Snackbar>
      <Dialog open={open} onClose={localHandleClose}>
        <DialogTitle>
          Mark <strong>{selectedMembersCount}</strong> selected member(s) as
          absent for Service on:
        </DialogTitle>
        <DialogContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setUseMutationState(true);
              const formData = new FormData(e.currentTarget);
              const _serviceId = formData.get("serviceId");
              if (_serviceId) {
                const serviceId = parseInt(_serviceId.toString());
                handleUnmarkingMembers(serviceId)
                  .then((isSuccess) => {
                    if (isSuccess) {
                      refetchMembers();
                      handleClose();
                    }
                  })
                  .catch((_) => null);
              }
            }}
          >
            <FormControl fullWidth variant="standard">
              <InputLabel>Service Date</InputLabel>
              <Select
                required
                label="Service Date"
                defaultValue={services[0]?.id ?? ""}
                name="serviceId"
              >
                {services
                  ? services.map((service) =>
                      service ? (
                        <MenuItem
                          value={service.id}
                          key={service.id}
                          defaultChecked={service.id === services[0]?.id}
                        >
                          {service.date.toLocaleDateString("en-GB")}
                        </MenuItem>
                      ) : null
                    )
                  : null}
              </Select>
            </FormControl>
            <LoadingButton
              variant="contained"
              isSuccess={isSuccess}
              isError={isError}
              isLoading={isLoading}
            >
              Mark as Absent
            </LoadingButton>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
