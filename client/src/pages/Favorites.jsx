import { useState, useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";
import axios from "axios";
import { t } from "../tools/utils";
import BooksList from "../components/BooksList";
import BookSpinner from "../components/BookSpinner";
import CustomAlert from "../components/CustomAlert";

const Favorites = () => {
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URI}/api/user/favorites`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setFavoriteBooks(response.data);
      } catch (err) {
        console.error("Error fetching favorite books:", err);
        setAlert({
          open: true,
          message: "Failed to load book details or reviews.",
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, []);

  return (
    <>
      <Box>
        <Container>
          <Typography variant="h5" gutterBottom>
            {"Favorite Books"}
          </Typography>
          {loading ? (
            <Typography variant="body1" color="error">
              <BookSpinner />
            </Typography>
          ) : favoriteBooks.length === 0 ? (
            <Typography variant="body1">
              {t("No favorite books yet.")}
            </Typography>
          ) : (
            <BooksList books={favoriteBooks} />
          )}
        </Container>
      </Box>
      <CustomAlert
        open={alert.open}
        message={alert.message}
        severity={alert.severity}
        onClose={() => setAlert({ open: false, message: "", severity: "info" })}
      />
    </>
  );
};

export default Favorites;
