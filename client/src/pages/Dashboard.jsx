import { useState, useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";
import axios from "axios";
import AppTop from "../components/AppTop";
import SearchBar from "../components/SearchBar";
import Categories from "../components/Categories";
import BooksList from "../components/BooksList";

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

  const mockBooks = [
    {
      title: "הנערה החדשה",
      author: "דניאל סילבה",
      image: "https://via.placeholder.com/100x150", // Replace with actual image URLs
      action: "שלח לקינדל",
    },
    {
      title: "יאלה",
      author: "ענת קלו לברון",
      image: "https://via.placeholder.com/100x150", // Replace with actual image URLs
      action: "שלח לקינדל",
    },
    {
      title: "1984",
      author: "ג'ורג' אורוול",
      image: "https://via.placeholder.com/100x150",
      action: "שלח לקינדל",
    },
  ];

  useEffect(() => {
    setCategories(mockCategories);
    setBooks(mockBooks);
  }, []);

  return (
    <Box>
      <AppTop />
      <Categories categories={categories} />
      {/* <SearchBar /> */}
      <Container>
        <BooksList books={books} />
      </Container>
    </Box>
  );
};

export default Dashboard;
