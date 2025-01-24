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
import { useState } from "react";
import axios from "axios";
import { isValidEmail, validatePassword } from "../tools/utils";

const RegisterForm = ({ onSwitch }) => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [localError, setLocalError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalError("");
    if (name === "passwordConfirm" && value !== formData.password) {
      setLocalError("Passwords do not match.");
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, passwordConfirm } = formData;

    if (!email || !password || !passwordConfirm) {
      setLocalError("All fields are required.");
      return;
    }

    if (password !== passwordConfirm) {
      setLocalError("Passwords do not match.");
      return;
    }

    if (!validatePassword(password)) {
      setLocalError("Password is weak.");
      return;
    }
    if (!isValidEmail(email)) {
      setLocalError("Invalid email.");
    }
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URI}/api/auth/register`,
        formData
      );
      if (res.status === 201) {
        onSwitch("login");
      }
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
        transform: "rotateX(180deg)",
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
          Register
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          name="email"
          onChange={handleChange}
          value={formData.email}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          name="password"
          onChange={handleChange}
          value={formData.password}
        />
        <TextField
          label="Confirm Password"
          type="password"
          variant="outlined"
          fullWidth
          name="passwordConfirm"
          onChange={handleChange}
          value={formData.passwordConfirm}
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
          Register
        </Button>
      </Stack>
    </Container>
  );
};

export default RegisterForm;
