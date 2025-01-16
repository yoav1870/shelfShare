import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Alert,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import axios from "axios";
import Categories from "../components/Categories";
import CustomAlert from "../components/CustomAlert";
import jsonCategories from "../tools/categories.json";
import { t } from "../tools/utils";

const Favorites = () => {
  const [categories, setCategories] = useState([]);
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  const fetchBooks = async () => {
    try {
      const token = localStorage.getItem("token");
      const baseURLBook = `${import.meta.env.VITE_SERVER_URI}/api/books`;

      const response = await axios.get(baseURLBook, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        setBooks(response.data);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
      setError(t("error-fetching-data"));
    }
  };

  useEffect(() => {
    fetchBooks();
    setCategories(jsonCategories.categories);
  }, []);

  const renderBooks = (books) => {
    return (
      <Grid container spacing={4}>
        {books.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={book.image || "placeholder.jpg"}
                alt={book.title}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {book.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {book.author}
                </Typography>
                <Button variant="outlined" color="primary" sx={{ marginTop: 2 }}>
                  {t("view-details")}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Box sx={{ marginBottom: 4 }}>
      <Categories categories={categories} />
      <Container>
        {error && (
          <CustomAlert
            open={!!error}
            message={error}
            severity="error"
            onClose={() => setError(null)}
          />
        )}

        <Typography variant="h5" gutterBottom sx={{ textAlign: "center" }}>
          {t("all-books")}
        </Typography>

        {books.length === 0 ? (
          <Alert severity="warning" sx={{ textAlign: "center", fontSize: "1rem", gap: 1 }}>
            {t("no-books-available")}
          </Alert>
        ) : (
          renderBooks(books)
        )}
      </Container>
    </Box>
  );
};

export default Favorites;