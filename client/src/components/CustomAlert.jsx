import { Alert, Snackbar } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";

const CustomAlert = ({
  open,
  message,
  severity = "info",
  onClose,
  autoHideDuration = 8000,
}) => {
  const theme = useTheme();

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
    >
      <Alert
        severity={severity}
        sx={{
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          direction: "rtl",
          fontSize: "1rem",
          padding: "8px 16px",
          gap: 1,
          boxShadow: `4px 4px 10px ${
            severity === "error"
              ? theme.palette.error.main
              : theme.palette.primary.light
          }`,
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

CustomAlert.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  severity: PropTypes.oneOf(["error", "warning", "info", "success"]),
  onClose: PropTypes.func.isRequired,
  autoHideDuration: PropTypes.number,
};

export default CustomAlert;
