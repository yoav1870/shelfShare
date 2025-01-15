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

const BooksList = ({ books, showActionButton }) => {
  const navigate = useNavigate();

  const handleCardClick = (book) => {
    navigate(`/book/${book._id}`, { state: { book } });
  };

  return (
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

              {showActionButton && (
                <Button
                  variant="outlined"
                  sx={{ marginTop: 2 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    alert(`Borrowing: ${book.title}`);
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
  );
};

BooksList.propTypes = {
  books: PropTypes.array.isRequired,
  showActionButton: PropTypes.bool,
};

BooksList.defaultProps = {
  showActionButton: true,
};

export default BooksList;
