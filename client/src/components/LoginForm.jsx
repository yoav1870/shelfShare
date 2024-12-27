import {
  Container,
  TextField,
  Button,
  Typography,
  Stack,
  Box,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const LoginForm = ({ onSwitch }) => {
  const theme = useTheme();

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
        <TextField label="Email" variant="outlined" fullWidth />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            mt: -1,
          }}
        >
          <Button
            variant="text"
            color={theme.palette.secondary.main}
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
