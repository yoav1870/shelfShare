import { Alert, Snackbar } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useEffect } from "react";

const CustomAlert = ({ open, message, severity, onClose }) => {
  const theme = useTheme();

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose();
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [open, onClose]);

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      sx={{ zIndex: 999, top: 64 }}
    >
      <Alert
        severity={severity}
        sx={{
          backgroundColor:
            severity === "error"
              ? theme.palette.error.main
              : theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          fontWeight: "bold",
          boxShadow: `0px 4px 10px ${theme.palette.primary.light}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 2,
          width: "50%",
        }}
        action={null}
        onClick={onClose}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomAlert;
