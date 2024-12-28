import { Box, Card, CardContent, Typography, Avatar } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import UserGraph from "../components/UserGraph";
import { t } from "../tools/utils";

const ProfilePage = () => {
  const theme = useTheme();

  // TODO: Replace with actual data until Idan finishes the backend
  const barChartData = [
    { name: "Jan", value: 3 },
    { name: "Feb", value: 4 },
    { name: "Mar", value: 2 },
  ];
  // TODO: Replace with actual data until Idan finishes the backend
  const pieChartData = [
    { name: "Romantic", value: 25 },
    { name: "Short Stories", value: 50 },
    { name: "Sci-Fi", value: 25 },
  ];

  return (
    <Box sx={{ p: 2, backgroundColor: theme.palette.background.default }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Avatar
          sx={{
            width: 80,
            height: 80,
            bgcolor: theme.palette.primary.light,
            mb: 1,
          }}
        >
          YZ
        </Avatar>
        <Typography variant="h6">Yoav Zucker</Typography>
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <UserGraph
            data={barChartData}
            chartType={1}
            title={t("Books gave in each month")}
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <UserGraph
            data={pieChartData}
            chartType={0}
            title={t("Favorite Genres")}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfilePage;
