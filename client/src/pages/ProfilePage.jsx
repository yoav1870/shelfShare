import { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  Divider,
  Alert,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import UserGraph from "../components/UserGraph";
import { t } from "../tools/utils";

const ProfilePage = () => {
  const theme = useTheme();
  const [donations, setDonations] = useState([]);
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);

  const fetchDonations = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URI}/api/user/donations`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDonations(response.data);
    } catch (err) {
      console.error("Error fetching donations:", err);
      setError(t("Error fetching donation data."));
    }
  };

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URI}/api/user/requests`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(response.data);
    } catch (err) {
      console.error("Error fetching requests:", err);
      setError(t("Error fetching request data."));
    }
  };

  useEffect(() => {
    fetchDonations();
    fetchRequests();
  }, []);

  const renderStats = () => {
    const stats = [
      { label: t("Books Donated"), value: donations.length },
      { label: t("Books Requested"), value: requests.length },
    ];

    return (
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Card
              sx={{
                textAlign: "center",
                p: 2,
                boxShadow: 3,
                background: "linear-gradient(135deg, #FFEBEE, #FCE4EC)",
              }}
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
  };

  const renderDonationGraph = () => {
    const data = donations.map((donation) => ({
      name: donation.title,
      value: 1,
    }));

    return (
      <UserGraph
        data={data}
        chartType={0}
        title={t("Books Donated by Title")}
      />
    );
  };

  const renderRequestGraph = () => {
    const data = requests.map((request) => ({
      name: request.title,
      value: 1,
    }));

    return (
      <UserGraph
        data={data}
        chartType={0}
        title={t("Books Requested by Title")}
      />
    );
  };

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box
      sx={{
        p: 3,
        background: "linear-gradient(to right, #E3F2FD, #E1F5FE)",
        borderRadius: 2,
        boxShadow: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Avatar
          sx={{
            width: 100,
            height: 100,
            background: "linear-gradient(to bottom, #42A5F5, #64B5F6)",
            mb: 2,
            boxShadow: 4,
          }}
        >
          U
        </Avatar>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          {t("User Profile")}
        </Typography>
      </Box>

      {renderStats()}

      <Divider sx={{ my: 4 }} />

      <Card
        sx={{
          mb: 3,
          boxShadow: 4,
          background: "linear-gradient(to bottom, #FFF3E0, #FFF8E1)",
        }}
      >
        <CardContent>{renderDonationGraph()}</CardContent>
      </Card>

      <Card
        sx={{
          mb: 3,
          boxShadow: 4,
          background: "linear-gradient(to bottom, #E8F5E9, #F1F8E9)",
        }}
      >
        <CardContent>{renderRequestGraph()}</CardContent>
      </Card>
    </Box>
  );
};

export default ProfilePage;
