import { Backdrop, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

interface TempBackDropProps {
  open: boolean;
}

export const TempBackDrop = ({ open }: TempBackDropProps) => {
  // const [localOpen, setLocalOpen] = useState(true);
  // useEffect(() => {
  //   const id = setTimeout(() => {
  //     setLocalOpen(false);
  //   }, 3000);

  //   return () => {
  //     clearTimeout(id);
  //   }
  // }, [])
  return (
    <Backdrop open={open}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
