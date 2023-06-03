import { Backdrop, CircularProgress } from "@mui/material";

interface TempBackDropProps {
  open: boolean;
}

export const TempBackDrop = ({ open }: TempBackDropProps) => {
  return (
    <Backdrop open={open}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
