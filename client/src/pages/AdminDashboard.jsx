import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import UserGraph from "../components/UserGraph";
import CustomAlert from "../components/CustomAlert";
import BookSpinner from "../components/BookSpinner";
import axios from "axios";
import { Delete as DeleteIcon } from "@mui/icons-material";

const AdminDashboard = () => {
  const theme = useTheme();
  const [usersData, setUsersData] = useState(null);
  const [booksData, setBooksData] = useState(null);
  const [reviewsData, setReviewsData] = useState(null);
  const [suspiciousReviews, setSuspiciousReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedReview, setSelectedReview] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDeleteReview = async (reviewId) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      await axios.delete(
        `${
          import.meta.env.VITE_SERVER_URI
        }/api/review/admin/reviews/${reviewId}`,
        { headers }
      );
      setSuspiciousReviews((prev) =>
        prev.filter((review) => review._id !== reviewId)
      );
      setIsDialogOpen(false);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to delete the review.");
      setIsDialogOpen(false);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const baseURLBook = `${import.meta.env.VITE_SERVER_URI}/api/admin`;

        const token = localStorage.getItem("token");
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const [
          usersResponse,
          booksResponse,
          reviewsResponse,
          suspiciousResponse,
        ] = await Promise.all([
          axios.get(`${baseURLBook}/usersData`, { headers }),
          axios.get(`${baseURLBook}/booksData`, { headers }),
          axios.get(`${baseURLBook}/reviewsData`, { headers }),
          axios.get(`${baseURLBook}/susReviews`, { headers }),
        ]);

        setUsersData(usersResponse.data || {});
        setBooksData(booksResponse.data || {});
        setReviewsData(reviewsResponse.data || {});
        setSuspiciousReviews(suspiciousResponse.data || []);

        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch admin data.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <BookSpinner />;
  }

  if (error) {
    return (
      <CustomAlert
        open={true}
        message={error}
        severity="error"
        onClose={() => setError("")}
      />
    );
  }

  const monthsData = usersData?.months || [];
  const usersCount = usersData?.usersCount || 0;
  const reviewsRatings = reviewsData?.ratings || [];
  const reviewsCount = reviewsData?.reviewsCount || 0;

  return (
    <Box sx={{ p: 2, backgroundColor: theme.palette.background.default }}>
      <Typography variant="h4" align="center" gutterBottom>
        Admin Dashboard
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <UserGraph
            data={monthsData.map((value, index) => ({
              name: new Date(0, index).toLocaleString("default", {
                month: "short",
              }),
              value,
            }))}
            chartType={1}
            title="Users Registered per Month"
          />
          <Typography variant="subtitle1">Total Users: {usersCount}</Typography>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" align="center" gutterBottom>
            Books Status Distribution
          </Typography>
          <UserGraph
            data={[
              { name: "Reserved", value: booksData?.resBooks || 0 },
              { name: "Borrowed", value: booksData?.borBooks || 0 },
              { name: "Available", value: booksData?.availableBooks || 0 },
            ]}
            chartType={0}
            title="Book Status"
          />

          <Typography variant="h6" align="center" gutterBottom sx={{ mt: 3 }}>
            Books Condition Distribution
          </Typography>
          <UserGraph
            data={[
              { name: "New", value: booksData?.newBooks || 0 },
              { name: "Like New", value: booksData?.likeNewBooks || 0 },
              { name: "Used", value: booksData?.usedBooks || 0 },
              { name: "Heavily Used", value: booksData?.heavilyUsedBooks || 0 },
            ]}
            chartType={1}
            title="Book Condition"
          />
          <Typography variant="subtitle1" align="center">
            Total Books: {booksData?.booksCount || 0}
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <UserGraph
            data={reviewsRatings.map((value, index) => ({
              name: `Rating ${index + 1}`,
              value,
            }))}
            chartType={1}
            title="Reviews Ratings Distribution"
          />
          <Typography variant="subtitle1">
            Total Reviews: {reviewsCount}
          </Typography>
        </CardContent>
      </Card>
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" align="center" gutterBottom>
            Suspicious Reviews
          </Typography>
          {suspiciousReviews.length === 0 ? (
            <Typography>No suspicious reviews found.</Typography>
          ) : (
            suspiciousReviews.map((review) => (
              <Box
                key={review._id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  border: "1px solid",
                  borderRadius: 1,
                  p: 2,
                  mb: 2,
                }}
              >
                <Box>
                  <Typography>
                    <strong>Book:</strong> {review.book_refId?.title || "N/A"}{" "}
                    by {review.book_refId?.author || "N/A"}
                  </Typography>
                  <Typography>
                    <strong>User:</strong> {review.user_refId?.email || "N/A"}
                  </Typography>
                  <Typography>
                    <strong>Review:</strong> {review.review_text || "N/A"}
                  </Typography>
                </Box>
                <IconButton
                  color="error"
                  onClick={() => {
                    setSelectedReview(review);
                    setIsDialogOpen(true);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))
          )}
        </CardContent>
      </Card>

      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete this comment?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action is irreversible. The selected review will be permanently
            deleted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
          <Button
            color="error"
            onClick={() => handleDeleteReview(selectedReview._id)}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminDashboard;
