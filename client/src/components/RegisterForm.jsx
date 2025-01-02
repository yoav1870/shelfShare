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
import { useState } from "react";
import axios from "axios";

const RegisterForm = ({ onSwitch }) => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, passwordConfirm } = formData;

    if (!email || !password || !passwordConfirm) {
      console.error("All fields are required.");
      return;
    }

    if (password !== passwordConfirm) {
      console.error("Passwords do not match.");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URI}/api/auth/register`,
        formData
      );
      if (res.status === 201) {
        console.log("Registration Successful:", res.data);
        onSwitch("login");
      }
    } catch (error) {
      console.error("Registration Error:", error);
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
          onChange={handleChange}
          value={formData.email}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          name="password"
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
          onChange={handleChange}
          value={formData.password}
        />
        <TextField
          label="Confirm Password"
          type="password"
          variant="outlined"
          name="passwordConfirm"
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
          onChange={handleChange}
          value={formData.passwordConfirm}
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
          onClick={handleSubmit}
        >
          Register
        </Button>
      </Stack>
    </Container>
  );
};

export default RegisterForm;
