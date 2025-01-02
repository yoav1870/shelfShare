import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Stack,
  IconButton,
  Alert,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import { isValidEmail } from "../tools/utils";

const ForgotPasswordForm = ({ onSwitch }) => {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [localError, setLocalError] = useState("");

  const handleSubmit = async () => {
    setLocalError("");
    if (!email) {
      setLocalError("Email is required.");
      return;
    }
    if (!isValidEmail(email)) {
      setLocalError("Invalid email.");
      return;
    }
    try {
      await axios.post(`${import.meta.env.VITE_SERVER_URI}/api/auth/forgot`, {
        email,
      });
      onSwitch("login");
    } catch (error) {
      setLocalError(error.response?.data?.message || error.message);
    }
  };

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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {localError && (
          <Alert severity="error" sx={{ mt: 1 }}>
            {localError}
          </Alert>
        )}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
        >
          Reset Password
        </Button>
      </Stack>
    </Container>
  );
};

export default ForgotPasswordForm;
