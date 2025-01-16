import { useState } from "react";
import { Box, Typography, IconButton, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import axios from "axios";

const ReviewSection = ({ bookId }) => {
  const [showReviewInput, setShowReviewInput] = useState(false);
  const [newReview, setNewReview] = useState("");
  const [selectedStars, setSelectedStars] = useState(null);
  const [reviews, setReviews] = useState([]);

  const handleStarChange = (starValue) => {
    setSelectedStars(starValue);
  };

  const handleAddReview = async () => {
    setReviews((prevReviews) => [
      { text: newReview, rating: selectedStars },
      ...prevReviews,
    ]);
    if (newReview.trim() && selectedStars) {
      try {
        const token = localStorage.getItem("token");
        const baseURLBook = `${import.meta.env.VITE_SERVER_URI}/api/review`;

        const res = await axios.put(
          `${baseURLBook}`,
          { bookId, review_text: newReview, rating: selectedStars },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.status === 200) {
          setReviews((prevReviews) => [
            { text: newReview, rating: selectedStars },
            ...prevReviews,
          ]);
          setNewReview("");
          setSelectedStars(null);
        }
      } catch (error) {
        console.error("Failed to add review");
      }
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
              justifyContent: "space-between",
              alignItems: "center",
              height: "100%",
            }}
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <IconButton
                key={star}
                onClick={() => handleStarChange(star)}
                sx={{
                  color:
                    selectedStars && star <= selectedStars
                      ? "primary.main"
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
            {review.text} (
            {"★".repeat(review.rating) + "☆".repeat(5 - review.rating)})
          </Typography>
        ))
      ) : (
        <Typography variant="body2" color="text.secondary">
          No review history available.
        </Typography>
      )}
    </>
  );
};

export default ReviewSection;
