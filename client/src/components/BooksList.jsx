import React, { useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import CustomAlert from "../components/CustomAlert";

const BooksList = ({ books = [], showActionButton = true }) => {
  const navigate = useNavigate();
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const handleBorrowRequest = async (book) => {
    const token = localStorage.getItem("token");
    const baseURLBook = `${import.meta.env.VITE_SERVER_URI}/api/books`;

    try {
      const res = await axios.post(
        `${baseURLBook}/request`,
        { bookId: book._id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.status === 201) {
        setBorrowedBooks((prev) => [...prev, book._id]);
        setAlert({
          open: true,
          message: `Successfully borrowed: ${book.title}`,
          severity: "success",
        });
      }
    } catch (error) {
      setAlert({
        open: true,
        message: `Failed to borrow: ${book.title}`,
        severity: "error",
      });
    }
  };

  const handleCardClick = (book) => {
    navigate(`/book/${book._id}`, { state: { book } });
  };

  const handleCloseAlert = () => {
    setAlert((prev) => ({ ...prev, open: false }));
  };

  return (
    <>
      <Grid container spacing={3}>
        {books.map((book) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={book._id}>
            <Card
              sx={{
                cursor: "pointer",
                "&:hover": {
                  transform: "scale(1.02)",
                  transition: "transform 0.3s ease-in-out",
                },
              }}
              onClick={() => handleCardClick(book)}
            >
              <CardMedia
                component="img"
                image={book.metadata?.thumbnail || "/placeholder.png"}
                alt={book.title}
                sx={{ height: 200, objectFit: "cover" }}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {book.title}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  By: {book.author}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    marginTop: 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {book.metadata?.description || "No description available."}
                </Typography>

                {showActionButton && !borrowedBooks.includes(book._id) && (
                  <Button
                    variant="outlined"
                    sx={{ marginTop: 2 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBorrowRequest(book);
                    }}
                  >
                    Borrow this Book
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <CustomAlert
        open={alert.open}
        message={alert.message}
        severity={alert.severity}
        onClose={handleCloseAlert}
      />
    </>
  );
};

export default BooksList;
