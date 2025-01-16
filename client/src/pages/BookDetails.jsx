import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Divider,
  IconButton,
  Button,
  TextField,
  useTheme,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState } from "react";
import axios from "axios";
import CustomAlert from "../components/CustomAlert";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";

const BookDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const { book } = location.state || {};
  const [addedToFavorites, setAddedToFavorites] = useState(false); // TODO: Check if book is in favorites from the db (Idan!!!!!!)
  const [showReviewInput, setShowReviewInput] = useState(false);
  const [newReview, setNewReview] = useState(null);
  const [reviews, setReviews] = useState(book.history?.reviews || []);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const handleAddToFavorites = async (bookId) => {
    const token = localStorage.getItem("token");
    const baseURLBook = `${import.meta.env.VITE_SERVER_URI}/api/books`;

    try {
      const res = await axios.put(
        `${baseURLBook}/like/${bookId}`,
        { bookId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.status === 200) {
        setAddedToFavorites(true);
        setAlert({
          open: true,
          message: "Added to favorites",
          severity: "success",
        });
      }
    } catch (error) {
      setAlert({
        open: true,
        message: "Failed to add to favorites",
        severity: "error",
      });
    }
  };

  const handleRemoveFromFavorites = async (bookId) => {
    const token = localStorage.getItem("token");
    const baseURLBook = `${import.meta.env.VITE_SERVER_URI}/api/books`;

    try {
      const res = await axios.put(
        `${baseURLBook}/unlike/${bookId}`,
        { bookId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.status === 200) {
        setAddedToFavorites(false);
        setAlert({
          open: true,
          message: "Removed from favorites",
          severity: "info",
        });
      }
    } catch (error) {
      setAlert({
        open: true,
        message: "Failed to remove from favorites",
        severity: "error",
      });
    }
  };

  const handleToggleFavorite = () => {
    if (addedToFavorites) {
      handleRemoveFromFavorites(book._id);
    } else {
      handleAddToFavorites(book._id);
    }
  };

  const handleAddReview = async () => {
    if (newReview.trim()) {
      try {
        const token = localStorage.getItem("token");
        const baseURLBook = `${import.meta.env.VITE_SERVER_URI}/api/review`;

        const res = await axios.put(
          `${baseURLBook}`,
          { bookId: book._id, review_text: newReview },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.status === 200) {
          setReviews((prevReviews) => [newReview, ...prevReviews]);
          setNewReview("");
          setAlert({
            open: true,
            message: "Review added successfully",
            severity: "success",
          });
        }
      } catch (error) {
        setAlert({
          open: true,
          message: "Failed to add review",
          severity: "error",
        });
      }
    }
  };

  if (!book) {
    return (
      <Box sx={{ textAlign: "center", padding: 4 }}>
        <Typography variant="h6">Book not found.</Typography>
      </Box>
    );
  }

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
              onClick={() => navigate(-1)}
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

          <img
            src={book.metadata?.thumbnail || "/placeholder.png"}
            alt={book.title}
            style={{
              width: "100%",
              height: 300,
              objectFit: "cover",
            }}
          />
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
              addedToFavorites ? <FavoriteIcon /> : <FavoriteBorderIcon />
            }
            sx={{
              textTransform: "capitalize",
              borderColor: "primary.main",
              color: "primary.main",
              "&:hover": {
                backgroundColor: "primary.light",
              },
            }}
            onClick={handleToggleFavorite}
          >
            {addedToFavorites ? "Add to Favorites" : "Remove from Favorites"}
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

        <Divider
          sx={{
            marginY: 2,
            borderColor: "primary.main",
          }}
        />

        <Typography
          variant="h6"
          gutterBottom
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              gap: 2,
            }}
          >
            Review History
            <IconButton
              sx={{
                color: "primary.main",
                "&:hover": { backgroundColor: "primary.light" },
              }}
              onClick={() => setShowReviewInput(!showReviewInput)}
            >
              {showReviewInput ? <CloseIcon /> : <AddIcon />}
            </IconButton>
            {showReviewInput ? (
              <IconButton
                sx={{
                  color: "success.main",
                  "&:hover": { backgroundColor: "primary.light" },
                }}
                onClick={handleAddReview}
              >
                <SaveIcon />
              </IconButton>
            ) : null}
          </box>
        </Typography>

        {showReviewInput && (
          <Box sx={{ marginBottom: 2, position: "relative" }}>
            <TextField
              fullWidth
              label="Your Review"
              placeholder="Write your review here..."
              variant="outlined"
              value={newReview}
              rows={3}
              multiline
              sx={{ marginBottom: 1 }}
              onChange={(e) => setNewReview(e.target.value)}
            />
          </Box>
        )}

        {reviews.length > 0 ? (
          reviews.map((review, idx) => (
            <Typography
              key={idx}
              variant="body2"
              gutterBottom
              sx={{
                backgroundColor: "rgba(0, 0, 0, 0.05)",
                padding: 1,
                borderRadius: 4,
                marginBottom: 1,
              }}
            >
              - {review}
            </Typography>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">
            No review history available.
          </Typography>
        )}
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
