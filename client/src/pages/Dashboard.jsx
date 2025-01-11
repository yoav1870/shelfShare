import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
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
      const baseURLBook = `${import.meta.env.VITE_SERVER_URI}/api/user`;

      // const recommendedBooks = await axios.get(
      //   `${baseURLBook}/recommendations`,
      //   {
      //     headers: { Authorization: `Bearer ${token}` },
      //   }
      // );

      // if (recommendedBooks.status === 200) {
      //   setRecommendedBooks(recommendedBooks.data);
      // }

      const donatedBooks = await axios.get(`${baseURLBook}/donations`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (donatedBooks.status === 200) {
        setDonatedBooks(donatedBooks.data);
      }

      const borrowedBooks = await axios.get(`${baseURLBook}/requests`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (borrowedBooks.status === 200) {
        setBorrowedBooks(borrowedBooks.data);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
      setError(t("error-fetching-data"));
    }
  };

  useEffect(() => {
    fetchBooks();
    setCategories(jsonCategories.categories);
  }, [limit]);

  const renderSection = (title, books) => {
    return (
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ textAlign: "right" }}>
          {title}
        </Typography>
        {books.length === 0 ? (
          <Alert
            severity="warning"
            sx={{
              textAlign: "right",
              direction: "rtl",
              fontSize: "1rem",
              gap: 1,
            }}
          >
            {t("no-books-available")}
          </Alert>
        ) : (
          <BooksList books={books} />
        )}
      </Box>
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

        {renderSection(t("book-recommendations"), recommendedBooks)}
        {renderSection(t("donated-books"), donatedBooks)}
        {renderSection(t("borrowed-books"), borrowedBooks)}
      </Container>
    </Box>
  );
};

export default Dashboard;
