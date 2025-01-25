import { useEffect, useState } from "react";
import { Box, TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import jsonCategories from "../tools/categories.json";
import Categories from "../components/Categories";
import { t } from "../tools/utils";
import CustomAlert from "../components/CustomAlert";
import BooksList from "../components/BooksList";

const Search = () => {
  const theme = useTheme();
  const [categories, setCategories] = useState([]);
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const fetchBooks = async (query, isCategory = false) => {
    const token = localStorage.getItem("token");
    const baseURLBook = `${import.meta.env.VITE_SERVER_URI}/api/books`;
    const endpoint = isCategory ? `/genre/${query}` : `/${query}`;

    try {
      const response = await axios.get(`${baseURLBook}${endpoint}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200 && response.data.length > 0) {
        setBooks(response.data);
      } else {
        setBooks([]);
        setAlert({
          open: true,
          message: "No books found",
          severity: "warning",
        });
      }
    } catch (error) {
      setAlert({
        open: true,
        message: "server error",
        severity: "error",
      });
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    fetchBooks(category, true);
  };

  const handleSearchClick = () => {
    setSelectedCategory(null);
    fetchBooks(searchQuery);
  };

  const handleCloseAlert = () => {
    setAlert((prev) => ({ ...prev, open: false }));
  };

  useEffect(() => {
    setCategories(jsonCategories.categories);
  }, []);

  return (
    <Box
      sx={{
        padding: 2,
        backgroundColor: theme.palette.background.default,
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          marginBottom: 3,
          backgroundColor: theme.palette.background.paper,
          borderRadius: 2,
          padding: 1,
          boxShadow: 1,
        }}
      >
        <TextField
          variant="standard"
          placeholder={t("search-placeholder")}
          fullWidth
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            disableUnderline: true,
            sx: { padding: 1, direction: "rtl" },
          }}
        />
        <IconButton color="primary" onClick={handleSearchClick}>
          <SearchIcon />
        </IconButton>
      </Box>
      <Categories
        categories={categories}
        onCategorySelect={handleCategoryClick}
        selectedCategory={selectedCategory}
      />
      <BooksList books={books} showActionButton={true} />
      <CustomAlert
        open={alert.open}
        message={alert.message}
        severity={alert.severity}
        onClose={handleCloseAlert}
      />
    </Box>
  );
};

export default Search;
