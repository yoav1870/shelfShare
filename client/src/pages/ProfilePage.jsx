import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import { Box, Typography, Paper, Grid } from "@mui/material";
import UserGraph from "../components/UserGraph";
import BookSpinner from "../components/BookSpinner";
import CustomAlert from "../components/CustomAlert";

const ProfilePage = () => {
  const theme = useTheme();
  const [donations, setDonations] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const [donationRes, requestRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_SERVER_URI}/api/user/donations`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${import.meta.env.VITE_SERVER_URI}/api/user/requests`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setDonations(donationRes.data);
        setRequests(requestRes.data);
      } catch (err) {
        setAlert({
          open: true,
          message: "Failed to load book details or reviews.",
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <BookSpinner />
      </Box>
    );
  }

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });

  const activityData = [...donations, ...requests].reduce((acc, book) => {
    const date = formatDate(book.date);
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const activityChart = Object.keys(activityData).map((date) => ({
    name: date,
    value: activityData[date],
  }));

  const genreData = [...donations, ...requests].reduce((acc, book) => {
    acc[book.genre] = (acc[book.genre] || 0) + 1;
    return acc;
  }, {});

  const genreChart = Object.keys(genreData).map((genre) => ({
    name: genre,
    value: genreData[genre],
  }));

  const bookCount = [...donations, ...requests].reduce((acc, book) => {
    acc[book.title] = (acc[book.title] || 0) + 1;
    return acc;
  }, {});

  const popularBooksChart = Object.keys(bookCount).map((title) => ({
    name: title,
    value: bookCount[title],
  }));

  const ratioChart = [
    { name: "Donated", value: donations.length },
    { name: "Requested", value: requests.length },
  ];

  return (
    <Box p={3}>
      <Typography variant="h4" textAlign="center" mb={3}>
        My Profile Analytics
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, backgroundColor: theme.palette.background.paper }}>
            <UserGraph
              data={activityChart}
              chartType={1}
              title="Book Activity Over Time"
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, backgroundColor: theme.palette.background.paper }}>
            <UserGraph
              data={ratioChart}
              chartType={0}
              title="Donation vs. Request Ratio"
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, backgroundColor: theme.palette.background.paper }}>
            <UserGraph
              data={genreChart}
              chartType={0}
              title="Genre Distribution"
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, backgroundColor: theme.palette.background.paper }}>
            <UserGraph
              data={popularBooksChart}
              chartType={1}
              title="Most Popular Books"
            />
          </Paper>
        </Grid>
      </Grid>
      <CustomAlert
        open={alert.open}
        message={alert.message}
        severity={alert.severity}
        onClose={() => setAlert({ open: false, message: "", severity: "info" })}
      />
    </Box>
  );
};

export default ProfilePage;
