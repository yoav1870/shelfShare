import { useState } from "react";
import { Box, Typography, IconButton, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import axios from "axios";
import CustomAlert from "../components/CustomAlert";

const ReviewSection = ({ reviews: initialReviews, bookId }) => {
  const [showReviewInput, setShowReviewInput] = useState(false);
  const [newReview, setNewReview] = useState("");
  const [selectedStars, setSelectedStars] = useState(null);
  const [reviews, setReviews] = useState(initialReviews || []);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const handleToggleReviewInput = () => {
    setNewReview("");
    setSelectedStars(null);
    setShowReviewInput((prev) => !prev);
  };

  const handleStarChange = (starValue) => {
    setSelectedStars(starValue);
  };

  const handleAddReview = async () => {
    if (!newReview.trim() || !selectedStars) {
      setAlert({
        open: true,
        message: "Please provide a review and rating.",
        severity: "error",
      });
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const baseURL = `${import.meta.env.VITE_SERVER_URI}/api/reviews`;

      const response = await axios.post(
        baseURL,
        { bookId, review_text: newReview, rating: selectedStars },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 201) {
        setReviews((prevReviews) => [
          { review_text: newReview, rating: selectedStars, date: new Date() },
          ...prevReviews,
        ]);
        setNewReview("");
        setSelectedStars(null);
        setShowReviewInput(false);
        setAlert({
          open: true,
          message: "Review added successfully.",
          severity: "success",
        });
      }
    } catch (error) {
      console.error("Failed to add review:", error);
      setAlert({
        open: true,
        message: "Server error. Unable to add review.",
        severity: "error",
      });
    }
  };

  return (
    <>
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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            gap: 2,
          }}
        >
          Reviews
          <IconButton
            sx={{
              color: "primary.main",
              "&:hover": { backgroundColor: "primary.light" },
            }}
            onClick={handleToggleReviewInput}
          >
            {showReviewInput ? <CloseIcon /> : <AddIcon />}
          </IconButton>
          {showReviewInput && (
            <IconButton
              sx={{
                color: "success.main",
                "&:hover": { backgroundColor: "success.light" },
              }}
              onClick={handleAddReview}
            >
              <SaveIcon />
            </IconButton>
          )}
        </Box>
      </Typography>

      {showReviewInput && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
            alignItems: "flex-start",
            marginBottom: 2,
          }}
        >
          <TextField
            fullWidth
            label="Your Review"
            placeholder="Write your review here..."
            variant="outlined"
            value={newReview}
            rows={10}
            multiline
            sx={{ marginBottom: 1 }}
            onChange={(e) => setNewReview(e.target.value)}
          />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <IconButton
                key={star}
                onClick={() => handleStarChange(star)}
                sx={{
                  color:
                    selectedStars && star <= selectedStars
                      ? "gold"
                      : "grey.400",
                }}
              >
                {selectedStars && star <= selectedStars ? (
                  <StarIcon fontSize="large" />
                ) : (
                  <StarBorderIcon fontSize="large" />
                )}
              </IconButton>
            ))}
          </Box>
        </Box>
      )}

      {reviews.length > 0 ? (
        reviews.map((review, idx) => (
          <Box
            key={idx}
            sx={{
              backgroundColor: "rgba(0, 0, 0, 0.05)",
              padding: 2,
              borderRadius: 4,
              marginBottom: 1,
            }}
          >
            <Typography variant="body2" gutterBottom>
              {review.review_text} (
              {"★".repeat(review.rating) + "☆".repeat(5 - review.rating)})
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "block" }}
            >
              {new Date(review.date).toLocaleDateString()}
            </Typography>
          </Box>
        ))
      ) : (
        <Typography variant="body2" color="text.secondary">
          No reviews yet.
        </Typography>
      )}

      <CustomAlert
        open={alert.open}
        message={alert.message}
        severity={alert.severity}
        onClose={() => setAlert({ open: false, message: "", severity: "" })}
      />
    </>
  );
};

export default ReviewSection;
