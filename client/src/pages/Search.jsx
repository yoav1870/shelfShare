import { useEffect, useState } from "react";
import { Box, TextField, IconButton, Typography, Alert } from "@mui/material";
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
  const [dbBooks, setDbBooks] = useState([]);
  const [apiBooks, setApiBooks] = useState([]);
  const [dbBooksError, setDbBooksError] = useState(false);
  const [apiBooksError, setApiBooksError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const [hasSearched, setHasSearched] = useState(false);

  const fetchBooks = async (query, type = "title") => {
    if (!query.trim()) return;

    setHasSearched(true);
    const token = localStorage.getItem("token");
    const baseURLBook = `${import.meta.env.VITE_SERVER_URI}/api/books/search`;

    try {
      const response = await axios.get(
        `${baseURLBook}?query=${query}&type=${type}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        const dbBooks = Array.isArray(response.data.dbBooks)
          ? response.data.dbBooks
          : [];
        const apiBooks = Array.isArray(response.data.apiBooks)
          ? response.data.apiBooks
          : [];

        setDbBooks(dbBooks);
        setApiBooks(apiBooks);

        setDbBooksError(dbBooks.length === 0);
        setApiBooksError(apiBooks.length === 0);

        if (dbBooks.length === 0 && apiBooks.length === 0) {
          setAlert({
            open: true,
            message: "No books found",
            severity: "warning",
          });
        }
      }
    } catch (error) {
      setAlert({
        open: true,
        message: "Server error",
        severity: "error",
      });
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = () => {
    setSelectedCategory(null);
    fetchBooks(searchQuery, "title");
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    fetchBooks(category, "genre");
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

      {!hasSearched && (
        <Box
          sx={{
            textAlign: "center",
            marginTop: 4,
            color: theme.palette.text.secondary,
          }}
        >
          <Typography variant="h5">😊</Typography>
          <Typography variant="body1">
            Try searching for books or selecting a category.
          </Typography>
        </Box>
      )}

      {hasSearched && (
        <Box sx={{ marginBottom: 4 }}>
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Books from Our Library
          </Typography>
          {dbBooksError ? (
            <Alert severity="warning" sx={{ marginTop: 2 }}>
              No books found in our library for this search.
            </Alert>
          ) : (
            <BooksList
              books={dbBooks}
              direction={"row"}
              showActionButton={true}
            />
          )}
        </Box>
      )}

      {hasSearched && (
        <Box sx={{ marginBottom: 4 }}>
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Books from External API
          </Typography>
          {apiBooksError ? (
            <Alert severity="warning" sx={{ marginTop: 2 }}>
              No books found from the external API for this search.
            </Alert>
          ) : (
            <BooksList
              books={apiBooks}
              direction={"row"}
              showActionButton={false}
              isApiBooks={true}
            />
          )}
        </Box>
      )}

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
