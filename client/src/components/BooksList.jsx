import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import CustomAlert from "../components/CustomAlert";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const BooksList = ({
  books = [],
  showActionButton = false,
  onBookBorrowed,
  direction = "column",
}) => {
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
      if (res.status === 200) {
        setBorrowedBooks((prev) => [...prev, book._id]);
        setAlert({
          open: true,
          message: `Successfully borrowed: ${book.title}`,
          severity: "success",
        });
        onBookBorrowed && onBookBorrowed(book);
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

  const scrollContainerRef = React.useRef(null);

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        overflow: direction === "row" ? "hidden" : "visible",
      }}
    >
      {direction === "row" && (
        <>
          <IconButton
            sx={{
              position: "absolute",
              top: "50%",
              left: 0,
              zIndex: 10,
              transform: "translateY(-50%)",
              backgroundColor: "white",
            }}
            onClick={() => handleScroll("left")}
          >
            <ArrowBackIos />
          </IconButton>
        </>
      )}

      <Box
        ref={scrollContainerRef}
        sx={{
          display: "flex",
          flexDirection: direction === "row" ? "row" : "column",
          overflowX: direction === "row" ? "auto" : "visible",
          scrollBehavior: direction === "row" ? "smooth" : "unset",
          padding: 2,
          gap: 2,
        }}
      >
        {books.map((book, index) => (
          <Card
            key={index}
            sx={{
              minWidth: 200,
              marginRight: direction === "row" ? 2 : 0,
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
              {showActionButton && !borrowedBooks.includes(book._id) && (
                <Button
                  variant="outlined"
                  sx={{ marginTop: 1 }}
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
        ))}
      </Box>

      {direction === "row" && (
        <>
          <IconButton
            sx={{
              position: "absolute",
              top: "50%",
              right: 0,
              zIndex: 10,
              transform: "translateY(-50%)",
              backgroundColor: "white",
            }}
            onClick={() => handleScroll("right")}
          >
            <ArrowForwardIos />
          </IconButton>
        </>
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

BooksList.propTypes = {
  books: PropTypes.array,
  showActionButton: PropTypes.bool,
  onBookBorrowed: PropTypes.func,
  direction: PropTypes.oneOf(["row", "column"]),
};

export default BooksList;
