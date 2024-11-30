import { Alert, Snackbar } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const CustomAlert = ({ open, message, severity, onClose }) => {
  const theme = useTheme();

  return (
    <Snackbar
      open={open}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      sx={{ zIndex: 999 }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        sx={{
          backgroundColor:
            severity === "error"
              ? theme.palette.error.main
              : theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          fontWeight: "bold",
          boxShadow: `0px 4px 10px ${theme.palette.primary.light}`,
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomAlert;
