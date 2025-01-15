import { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  Button,
  Chip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useTheme } from "@mui/material/styles";
import jsonCategories from "../tools/categories.json";
import Categories from "../components/Categories";
import { t } from "../tools/utils";

const Search = () => {
  const theme = useTheme();
  const [categories, setCategories] = useState([]);
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    // fetchBooks();
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
        <IconButton color="primary">
          <SearchIcon />
        </IconButton>
      </Box>
      <Categories categories={categories} />

      <Box>
        {/* {books.map((book, index) => (
          <Card
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 2,
              padding: 1,
              boxShadow: 1,
            }}
          >
            <CardMedia
              component="img"
              image={book.image}
              alt={book.title}
              sx={{ width: 80, height: 120, borderRadius: 1 }}
            />
            <CardContent sx={{ flexGrow: 1, padding: 1, direction: "rtl" }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {book.title}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {book.author}
              </Typography>
              <Box
                sx={{ display: "flex", gap: 1, flexWrap: "wrap", marginTop: 1 }}
              >
                {book.tags.map((tag, idx) => (
                  <Chip key={idx} label={tag} size="small" />
                ))}
              </Box>
            </CardContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {book.price}
              </Typography>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                הוסף לעגלה
              </Button>
              <IconButton color="secondary">
                <FavoriteBorderIcon />
              </IconButton>
            </Box>
          </Card>
        ))} */}
      </Box>
    </Box>
  );
};

export default Search;
