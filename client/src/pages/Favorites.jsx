import { useState, useEffect } from "react";
import { Box, Container, Typography, Grid, Card, CardContent, CardMedia } from "@mui/material";
import axios from "axios";
import { t } from "../tools/utils";

const Favorites = () => {
  const [donations, setDonations] = useState([]);
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
      setError(t("Error fetching donated books."));
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const renderBooks = () => (
    <Grid container spacing={4}>
      {donations.map((donation, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card>
            <CardMedia
              component="img"
              height="200"
              image="placeholder.jpg"
              alt={donation.title}
            />
            <CardContent>
              <Typography variant="h6">{donation.title}</Typography>
              <Typography variant="body2" color="textSecondary">
                {donation.genre}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Box>
      <Container>
        <Typography variant="h5" gutterBottom>
          {t("Favorite Books")}
        </Typography>

        {error ? (
          <Typography variant="body1" color="error">
            {error}
          </Typography>
        ) : donations.length === 0 ? (
          <Typography variant="body1">{t("No books donated yet.")}</Typography>
        ) : (
          renderBooks()
        )}
      </Container>
    </Box>
  );
};

export default Favorites;
