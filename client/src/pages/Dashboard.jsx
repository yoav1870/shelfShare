import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import axios from "axios";
import Categories from "../components/Categories";
import BooksList from "../components/BooksList";
import CustomAlert from "../components/CustomAlert";
import jsonCategories from "../tools/categories.json";
import { t } from "../tools/utils";

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [donatedBooks, setDonatedBooks] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10);

  const fetchBooks = async () => {
    try {
      const token = localStorage.getItem("token");
      const baseURL = `${import.meta.env.VITE_SERVER_URI}/api/books`;

      const recBooksRes = await axios.get(`${baseURL}/recommendations`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { limit },
      });
      if (recBooksRes.data.length === 0) {
        setError(t("no-recommended-books"));
      }
      setRecommendedBooks(recBooksRes.data);

      const donatedBooksRes = await axios.get(`${baseURL}/donated`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { limit },
      });

      if (donatedBooksRes.data.length === 0) {
        setError(t("no-donated-books"));
      }
      setDonatedBooks(donatedBooksRes.data);

      const borrowedBooksRes = await axios.get(`${baseURL}/borrowed`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { limit },
      });

      if (borrowedBooksRes.data.length === 0) {
        setError(t("no-borrowed-books"));
      }
      setBorrowedBooks(borrowedBooksRes.data);
    } catch (error) {
      console.error("Error fetching books:", error);
      setError(t("error-fetching-data"));
    }
  };

  useEffect(() => {
    fetchBooks();
    setCategories(jsonCategories.categories);
  }, [limit]); // Re-fetch when limit changes

  return (
    <Box>
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
        {/* Limit Picker */}
        {/* <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel id="limit-label">{t("select-limit")}</InputLabel>
          <Select
            labelId="limit-label"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
          >
            {[5, 10, 15, 20].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}

        <Typography variant="h6" gutterBottom>
          {t("book-recommendations")}
        </Typography>
        <BooksList books={recommendedBooks} />

        <Typography variant="h6" gutterBottom sx={{ marginTop: 4 }}>
          {t("donated-books")}
        </Typography>
        <BooksList books={donatedBooks} />

        <Typography variant="h6" gutterBottom sx={{ marginTop: 4 }}>
          {t("borrowed-books")}
        </Typography>
        <BooksList books={borrowedBooks} />
      </Container>
    </Box>
  );
};

export default Dashboard;
