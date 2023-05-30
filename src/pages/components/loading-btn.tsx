import { Box, Button, CircularProgress } from "@mui/material";
import { green, red } from "@mui/material/colors";
import { PropsWithChildren, MouseEvent } from "react";

interface LoadingButtonProps {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void | undefined;
  variant: "contained" | "outlined" | "text";
  color?: "inherit";
  useMutationState?: boolean | undefined;
}

const LoadingButton = ({
  isLoading,
  isSuccess,
  isError,
  children,
  onClick,
  variant,
  color,
  useMutationState,
}: LoadingButtonProps & PropsWithChildren) => {
  return (
    <Box sx={{ m: 1, position: "relative", width: "fit-content" }}>
      <Button
        color={
          useMutationState
            ? isSuccess
              ? "success"
              : isError
              ? "error"
              : color ?? "primary"
            : color ?? "primary"
        }
        variant={variant}
        type="submit"
        disabled={isLoading}
        onClick={onClick}
      >
        {children}
      </Button>
      {isLoading && (
        <CircularProgress
          size={24}
          sx={{
            color: green[500],
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: "-12px",
            marginLeft: "-12px",
          }}
        />
      )}
    </Box>
  );
};

export default LoadingButton;
