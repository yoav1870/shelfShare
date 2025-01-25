import {
  Container,
  TextField,
  Button,
  Typography,
  Stack,
  Box,
  Alert,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { isValidEmail } from "../tools/utils";
import { jwtDecode } from "jwt-decode";
import { requestPermission } from "../config/firebase";

const LoginForm = ({ onSwitch }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setLocalError] = useState("");
  const theme = useTheme();
  const navigate = useNavigate();

  const handleLoginSuccess = async (userId) => {
    try {
      await requestPermission(userId);
    } catch (error) {
      console.error("Error during handleLoginSuccess:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalError("");
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      setLocalError("Email and Password are required.");
      return;
    }

    if (!isValidEmail(email)) {
      setLocalError("Invalid email.");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URI}/api/auth/login`,
        formData
      );
      if (res.status === 200) {
        const { token, isAdmin } = res.data;
        localStorage.setItem("token", token);
        const decodedToken = jwtDecode(token);
        const userId = decodedToken?.id;
        if (!userId) {
          throw new Error("User ID not found in token.");
        }

        if (isAdmin) {
          navigate("/admin/dashboard");
        } else {
          await handleLoginSuccess(userId);
          navigate("/my-books");
        }
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
        backfaceVisibility: "hidden",
        transform: "rotateX(0deg)",
        backgroundColor: theme.palette.background.paper,
        padding: "20px",
        borderRadius: "8px",
        boxShadow: `0px 4px 10px ${theme.palette.primary.light}`,
      }}
    >
      <Stack spacing={2}>
        <Typography
          variant="h4"
          textAlign="center"
          gutterBottom
          sx={{ color: theme.palette.primary.main }}
        >
          Login
        </Typography>
        <TextField
          label="Email"
          name="email"
          variant="outlined"
          fullWidth
          onChange={handleChange}
          value={formData.email}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          variant="outlined"
          fullWidth
          onChange={handleChange}
          value={formData.password}
        />
        {error && (
          <Alert severity="error" sx={{ mt: 1 }}>
            {error}
          </Alert>
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            mt: 1, // Adjust spacing to fit better visually
          }}
        >
          <Button
            variant="text"
            color="primary"
            size="small"
            onClick={() => onSwitch("forgot")}
          >
            Forgot Password?
          </Button>
        </Box>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ flex: 2 }}
            onClick={handleSubmit}
          >
            Login
          </Button>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            sx={{ flex: 1 }}
            onClick={() => onSwitch("register")}
          >
            Register
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
};

export default LoginForm;
