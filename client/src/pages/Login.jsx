import { useState } from "react";
import { Box, Container, Alert } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import ForgotPasswordForm from "../components/ForgotPasswordForm";

const Login = () => {
  const [activeForm, setActiveForm] = useState("login");
  const theme = useTheme();

  const handleSwitch = (form) => {
    setActiveForm(form);
  };

  return (
    <Container
      sx={{
        perspective: "1000px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "400px",
          height: "400px",
          position: "relative",
          transformStyle: "preserve-3d",
          transition: "transform 0.7s",
          transform:
            activeForm === "register"
              ? "rotateX(180deg)"
              : activeForm === "forgot"
              ? "rotateX(-180deg)"
              : "rotateX(0deg)",
        }}
      >
        {activeForm === "login" && <LoginForm onSwitch={handleSwitch} />}
        {activeForm === "register" && <RegisterForm onSwitch={handleSwitch} />}
        {activeForm === "forgot" && (
          <ForgotPasswordForm onSwitch={handleSwitch} />
        )}
      </Box>
    </Container>
  );
};

export default Login;
