import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Button, Divider, IconButton } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

// temp until Idan will to history and reviersssss
const BookDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { book } = location.state || {};

  if (!book) {
    return (
      <Box sx={{ textAlign: "center", padding: 4 }}>
        <Typography variant="h6">Book not found.</Typography>
      </Box>
    );
  }

  return (
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
          startIcon={<FavoriteBorderIcon />}
          sx={{
            textTransform: "capitalize",
            borderColor: "primary.main",
            color: "primary.main",
            "&:hover": {
              backgroundColor: "primary.light",
            },
          }}
          //   onClick={() => alert(`${book.title} added to favorites!`)}
        >
          Add to Favorites
        </Button>
      </Box>

      {/* Book Details */}
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
        <strong>Published Date:</strong> {book.metadata?.publishedDate || "N/A"}
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

      <Typography variant="h6" gutterBottom>
        Borrow History
      </Typography>
      {book.history?.borrows?.length ? (
        book.history.borrows.map((entry, idx) => (
          <Typography key={idx} variant="body2" gutterBottom>
            - {entry}
          </Typography>
        ))
      ) : (
        <Typography variant="body2" color="text.secondary">
          No borrow history available.
        </Typography>
      )}

      <Divider
        sx={{
          marginY: 2,
          borderColor: "primary.main",
        }}
      />

      <Typography variant="h6" gutterBottom>
        Review History
      </Typography>
      {book.history?.reviews?.length ? (
        book.history.reviews.map((review, idx) => (
          <Typography key={idx} variant="body2" gutterBottom>
            - {review}
          </Typography>
        ))
      ) : (
        <Typography variant="body2" color="text.secondary">
          No review history available.
        </Typography>
      )}
    </Box>
  );
};

export default BookDetails;
