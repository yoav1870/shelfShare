import { Box, Card, CardContent, Typography, Avatar, Grid, Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Categories from "../components/Categories";
import UserGraph from "../components/UserGraph";
import { t } from "../tools/utils";

const ProfilePage = () => {
  const theme = useTheme();

  // Temporary mock data
  const barChartData = [
    { name: "Jan", value: 3 },
    { name: "Feb", value: 4 },
    { name: "Mar", value: 2 },
  ];

  const pieChartData = [
    { name: "Romantic", value: 25 },
    { name: "Short Stories", value: 50 },
    { name: "Sci-Fi", value: 25 },
  ];

  const barChartData2 = [
    { name: "Recived", value: 3 },
    { name: "Donated", value: 4 },
  ];

  const pieChartData2 = [
    { name: "Views", value: 15 },
    { name: "Donations", value: 10 },
    { name: "Requests", value: 65 },
  ];

  const userStats = [
    { label: t("Books Donated"), value: 30 },
    { label: t("Books Borrowed"), value: 12 },
    { label: t("Reviews Written"), value: 8 },
  ];

  const renderUserStats = () => (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      {userStats.map((stat, index) => (
        <Grid item xs={12} sm={4} key={index}>
          <Card
            sx={{
              textAlign: "center",
              p: 2,
              boxShadow: 3,
              background: "linear-gradient(135deg, #FFEBEE, #FCE4EC)",
            }}
            aria-label={`${stat.label}: ${stat.value}`} // Add descriptive label
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: theme.palette.primary.main }}
            >
              {stat.value}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {stat.label}
            </Typography>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
  

  return (
    <Box
      sx={{
        p: 3,
        background: "linear-gradient(to right, #E3F2FD, #E1F5FE)",
        borderRadius: 2,
        boxShadow: 4,
      }}
    >
      {/* Page Header with Labels */}
      <Box
        component="header"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: 4,
        }}
        aria-label={t("Profile Section")}
      >
        <Avatar
          sx={{
            width: 100,
            height: 100,
            background: "linear-gradient(to bottom, #42A5F5, #64B5F6)",
            mb: 2,
            boxShadow: 4,
          }}
          aria-label={t("User Avatar")}
        >
          YZ
        </Avatar>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", color: theme.palette.primary.dark }}
          aria-label={t("User Name")}
        >
          Yoav Zucker
        </Typography>
      </Box>

      {renderUserStats()}

      <Divider sx={{ my: 4, borderColor: theme.palette.primary.light }} />

      {/* Categories Section */}
      <Box component="section" aria-label={t("Categories Section")}>
        <Categories categories={["Romantic", "Sci-Fi", "Short Stories"]} />
      </Box>

      {/* Bar Chart Section */}
      <Card
        sx={{
          mb: 3,
          boxShadow: 4,
          background: "linear-gradient(to bottom, #E8F5E9, #F1F8E9)",
        }}
      >
        <CardContent>
          <UserGraph
            data={barChartData}
            chartType={1}
            title={"Books gave in each month"}
          />
        </CardContent>
      </Card>

      {/* Pie Chart Section */}
      <Card
        sx={{
          mb: 3,
          boxShadow: 4,
          background: "linear-gradient(to bottom, #FFF3E0, #FFF8E1)",
        }}
      >
        <CardContent>
          <UserGraph
            data={pieChartData}
            chartType={0}
            title={"Favorite Genres"}
          />
        </CardContent>
      </Card>

      {/* Insights Section */}
      <Card
        sx={{
          boxShadow: 4,
          background: "linear-gradient(to bottom, #E3F2FD, #E1F5FE)",
          p: 2,
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: theme.palette.primary.dark }}
            gutterBottom
            aria-label={"User Insights Header"}
          >
            {t("User Insights")}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ fontSize: "1rem", lineHeight: 1.5 }}
            aria-label={"User Insights Content"}
          >
            {t(
              "Your reading habits are diverse, with a focus on Short Stories and Romantic genres. Keep up the great work!"
            ) ||
              "Your reading habits are diverse, with a focus on Short Stories and Romantic genres. Keep up the great work!"}
          </Typography>
        </CardContent>
      </Card>
      <Card
        sx={{
          mb: 3,
          boxShadow: 4,
          background: "linear-gradient(to bottom, #FFF3E0, #FFF8E1)",
        }}
      >
        <CardContent>
          <UserGraph
            data={pieChartData2}
            chartType={0}
            title={"How i did?"}
          />
        </CardContent>
      </Card>
      <Card
        sx={{
          mb: 3,
          boxShadow: 4,
          background: "linear-gradient(to bottom, #E8F5E9, #F1F8E9)",
        }}
      >
        <CardContent>
          <UserGraph
            data={barChartData2}
            chartType={1}
            title={"Activity"}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfilePage;
