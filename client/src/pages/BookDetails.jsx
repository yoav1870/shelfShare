import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Divider,
  IconButton,
  Button,
  useTheme,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import { useState, useEffect } from "react";
import axios from "axios";
import CustomAlert from "../components/CustomAlert";
import ReviewSection from "../components/ReviewSection";
import BookSpinner from "../components/BookSpinner";

const BookDetails = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [addedToFavorites, setAddedToFavorites] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const token = localStorage.getItem("token");
        const baseURL = import.meta.env.VITE_SERVER_URI;

        const response = await axios.get(
          `${baseURL}/api/books/details/${bookId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status === 200) {
          const { book, isFavorite, reviews } = response.data;
          setBook(book);
          setAddedToFavorites(isFavorite || false);
          setReviews(reviews);
        }
      } catch (error) {
        console.error("Error fetching book details or reviews:", error);
        setAlert({
          open: true,
          message: "Failed to load book details or reviews.",
          severity: "error",
        });
      }
    };

    fetchBookData();
  }, [bookId]);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  if (!book) {
    return <BookSpinner />;
  }

  const images = [
    book.metadata?.thumbnail,
    ...(book.pics?.length ? book.pics : []),
  ].filter(Boolean);

  return (
    <>
      <Box sx={{ maxWidth: 800, margin: "0 auto", padding: 4 }}>
        <Box sx={{ position: "relative" }}>
          <Box
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              zIndex: 10,
            }}
          >
            <IconButton
              onClick={() => navigate(-1) || navigate("/my-books")}
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 1)",
                },
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
              }}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            {images.length > 1 && (
              <IconButton
                onClick={handlePrevImage}
                sx={{
                  position: "absolute",
                  left: 0,
                  zIndex: 2,
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                }}
              >
                <ArrowBackIosIcon />
              </IconButton>
            )}

            <img
              src={images[currentImageIndex] || "/placeholder.png"}
              alt={book.title}
              style={{
                width: "100%",
                height: 300,
                objectFit: "cover",
              }}
            />

            {images.length > 1 && (
              <IconButton
                onClick={handleNextImage}
                sx={{
                  position: "absolute",
                  right: 0,
                  zIndex: 2,
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                }}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            )}
          </Box>

          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              marginTop: 2,
              color: "text.primary",
            }}
          >
            {book.title}
          </Typography>
        </Box>

        <Box sx={{ textAlign: "center", marginY: 2 }}>
          <Button
            variant="outlined"
            startIcon={
              addedToFavorites ? (
                <ThumbDownOffAltIcon />
              ) : (
                <FavoriteBorderIcon />
              )
            }
            sx={{
              textTransform: "capitalize",
              borderColor: "primary.main",
              color: "primary.main",
              "&:hover": {
                backgroundColor: "primary.light",
              },
            }}
            onClick={() => setAddedToFavorites(!addedToFavorites)}
          >
            {addedToFavorites ? "Remove from Favorites" : "Add to Favorites"}
          </Button>
        </Box>

        <Typography variant="body2" gutterBottom>
          <strong>Author:</strong> {book.author}
        </Typography>
        <Typography variant="body2" gutterBottom>
          <strong>Genre:</strong> {book.genre || "N/A"}
        </Typography>
        <Typography variant="body2" gutterBottom>
          <strong>Status:</strong> {book.status}
        </Typography>
        <Typography variant="body2" gutterBottom>
          <strong>Publisher:</strong> {book.metadata?.publisher || "Unknown"}
        </Typography>
        <Typography variant="body2" gutterBottom>
          <strong>Published Date:</strong>{" "}
          {book.metadata?.publishedDate || "N/A"}
        </Typography>
        <Typography variant="body2" gutterBottom>
          <strong>Page Count:</strong> {book.metadata?.pageCount || "N/A"}
        </Typography>
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          {book.metadata?.description || "No description available."}
        </Typography>

        <Divider sx={{ marginY: 2, borderColor: "primary.main" }} />

        <ReviewSection reviews={reviews} bookId={bookId} />
      </Box>

      <CustomAlert
        open={alert.open}
        message={alert.message}
        severity={alert.severity}
        onClose={() => setAlert({ open: false, message: "", severity: "info" })}
      />
    </>
  );
};

export default BookDetails;
