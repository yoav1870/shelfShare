import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";

const BooksList = ({ books }) => {
  const theme = useTheme();

  return (
    <Grid container spacing={2}>
      {books.map((book, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card
            sx={{
              backgroundColor: theme.palette.background.paper,
              boxShadow: `0px 2px 4px ${theme.palette.primary.light}`,
            }}
          >
            <CardMedia
              component="img"
              height="140"
              image={book.image}
              alt={book.title}
            />
            <CardContent>
              <Typography
                variant="subtitle1"
                gutterBottom
                color={theme.palette.text.primary}
              >
                {book.title}
              </Typography>
              <Typography variant="body2" color={theme.palette.text.secondary}>
                {book.author}
              </Typography>
              <Button
                variant="outlined"
                sx={{
                  borderColor: theme.palette.primary.main,
                  color: theme.palette.primary.main,
                  "&:hover": {
                    backgroundColor: theme.palette.primary.light,
                  },
                }}
                size="small"
              >
                {book.action}
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

BooksList.propTypes = {
  books: PropTypes.array.isRequired,
};

export default BooksList;
