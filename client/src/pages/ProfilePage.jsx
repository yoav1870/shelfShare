import { Typography, Box } from "@mui/material";

const ProfilePage = () => {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        My Profile
      </Typography>
      <Typography variant="body1">
        Welcome to your profile page. Add content here!
      </Typography>
    </Box>
  );
};

export default ProfilePage;
