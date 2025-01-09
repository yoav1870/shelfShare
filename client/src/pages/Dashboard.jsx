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
import { useSelector } from "react-redux";

const Dashboard = () => {
  const user = useSelector((state) => state.user.user);
  const [categories, setCategories] = useState([]);
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [donatedBooks, setDonatedBooks] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10);

  const fetchBooks = async () => {
    try {
      const token = localStorage.getItem("token");
      const baseURL = `${import.meta.env.VITE_SERVER_URI}/api/user`;

      // const recBooksRes = await axios.get(`${baseURL}/recommendations`, {
      //   headers: { Authorization: `Bearer ${token}` },
      //   params: { userId: user._id, limit: 10 },
      // });
      // setRecommendedBooks(recBooksRes.data);
      const donatedBooksRes = await axios.get(`${baseURL}/donations`, {
        headers: { Authorization: `Bearer ${token}` },
        // params: { userId: user._id, limit: 10 },
      });

      setDonatedBooks(donatedBooksRes.data);

      // const borrowedBooksRes = await axios.get(`${baseURL}/user/requests`, {
      //   headers: { Authorization: `Bearer ${token}` },
      //   params: { userId: user._id, limit: 10 },
      // });
      // setBorrowedBooks(borrowedBooksRes.data);
    } catch (error) {
      console.error("Error fetching books:", error);
      setError("Failed to fetch books");
    }
  };

  useEffect(() => {
    if (user) {
      console.log("Fetching books...");
      fetchBooks();
    }
    setCategories(jsonCategories.categories);
  }, [limit]);

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
