import { useState, useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";
import axios from "axios";
import Categories from "../components/Categories";
import BooksList from "../components/BooksList";
import jsonCategories from "../tools/categories.json";

// TEMP UNTIL IDAN WILL DO THE DATABASE!// TODO:
const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [books, setBooks] = useState([]);

  const mockCategories = [
    { label: "נוער", icon: "👟" },
    { label: "עיון", icon: "💡" },
    { label: "ארוטיקה", icon: "💋" },
    { label: 'מד"ב', icon: "🚀" },
    { label: "כל הז'אנרים", icon: "🎨" },
    { label: 'מד"ב', icon: "🚀" },
    { label: 'מד"ב', icon: "🚀" },
  ];

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URI}/api/books`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setBooks(res.data);
        console.log("res.data", res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBooks();
    setCategories(jsonCategories.categories);
  }, []);

  return (
    <Box>
      <Categories categories={categories} />
      <Container>
        <BooksList books={books} />
      </Container>
    </Box>
  );
};

export default Dashboard;
