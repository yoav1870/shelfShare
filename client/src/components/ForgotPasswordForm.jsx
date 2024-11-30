import React from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Stack,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useTheme } from "@mui/material/styles";

const ForgotPasswordForm = ({ onSwitch }) => {
  const theme = useTheme();

  return (
    <Container
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "100%",
        backfaceVisibility: "hidden",
        transform: "rotateX(-180deg)",
        backgroundColor: theme.palette.background.paper,
        padding: "20px",
        borderRadius: "8px",
        boxShadow: `0px 4px 10px ${theme.palette.primary.light}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Back to Login Icon */}
      <IconButton
        sx={{
          position: "absolute",
          top: "10px",
          right: "10px",
        }}
        onClick={() => onSwitch("login")}
      >
        <ArrowBackIcon sx={{ color: theme.palette.primary.main }} />
      </IconButton>

      <Stack spacing={2} sx={{ width: "100%", maxWidth: "300px" }}>
        <Typography
          variant="h4"
          textAlign="center"
          gutterBottom
          sx={{
            color: theme.palette.primary.main,
            fontFamily: theme.typography.fontFamily,
          }}
        >
          Forgot Password
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: theme.palette.primary.main,
              },
              "&:hover fieldset": {
                borderColor: theme.palette.primary.dark,
              },
              "&.Mui-focused fieldset": {
                borderColor: theme.palette.primary.dark,
              },
            },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            fontFamily: theme.typography.fontFamily,
            backgroundColor: theme.palette.primary.main,
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
        >
          Reset Password
        </Button>
      </Stack>
    </Container>
  );
};

export default ForgotPasswordForm;
