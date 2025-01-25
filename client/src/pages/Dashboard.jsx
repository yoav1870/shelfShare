import { useState, useEffect } from "react";
import { Box, Container, Typography, Alert } from "@mui/material";
import axios from "axios";
import BooksList from "../components/BooksList";
import CustomAlert from "../components/CustomAlert";
import BookSpinner from "../components/BookSpinner";

import { t } from "../tools/utils";

const Dashboard = () => {
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [donatedBooks, setDonatedBooks] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [error, setError] = useState(null);
  const [loadingRecommended, setLoadingRecommended] = useState(true);
  const [loadingDonated, setLoadingDonated] = useState(true);
  const [loadingBorrowed, setLoadingBorrowed] = useState(true);

  const fetchRecommendedBooks = async () => {
    setLoadingRecommended(true);
    try {
      const token = localStorage.getItem("token");
      const baseURLBook = `${import.meta.env.VITE_SERVER_URI}/api/books`;
      const response = await axios.get(`${baseURLBook}/recommended`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        setRecommendedBooks(response.data || []);
      }
    } catch (error) {
      setError(t("error-fetching-recommended-books"));
    } finally {
      setLoadingRecommended(false);
    }
  };

  const fetchDonatedBooks = async () => {
    setLoadingDonated(true);
    try {
      const token = localStorage.getItem("token");
      const baseURLBook = `${import.meta.env.VITE_SERVER_URI}/api/user`;
      const response = await axios.get(`${baseURLBook}/donations`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        setDonatedBooks(response.data || []);
      }
    } catch (error) {
      setError(t("error-fetching-donated-books"));
    } finally {
      setLoadingDonated(false);
    }
  };

  const fetchBorrowedBooks = async () => {
    setLoadingBorrowed(true);
    try {
      const token = localStorage.getItem("token");
      const baseURLBook = `${import.meta.env.VITE_SERVER_URI}/api/user`;
      const response = await axios.get(`${baseURLBook}/requests`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        setBorrowedBooks(response.data || []);
      }
    } catch (error) {
      setError(t("error-fetching-borrowed-books"));
    } finally {
      setLoadingBorrowed(false);
    }
  };

  const handleBookBorrowed = (book) => {
    setBorrowedBooks((prev) => [...prev, book]);
  };

  useEffect(() => {
    fetchRecommendedBooks();
    fetchDonatedBooks();
    fetchBorrowedBooks();
  }, []);

  const renderSection = (title, books, loading, sectionName) => {
    return (
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ textAlign: "right" }}>
          {title}
        </Typography>
        {loading ? (
          <BookSpinner />
        ) : books.length === 0 ? (
          <Alert
            severity="warning"
            sx={{
              textAlign: "right",
              direction: "rtl",
              fontSize: "1rem",
              gap: 1,
            }}
          >
            {t("no-books-available")}
          </Alert>
        ) : (
          <BooksList
            books={books}
            direction="row"
            showActionButton={
              sectionName ? sectionName === "recommendations" : true
            }
            onBookBorrowed={handleBookBorrowed}
          />
        )}
      </Box>
    );
  };

  return (
    <Container>
      {error && (
        <CustomAlert
          open={!!error}
          message={error}
          severity="error"
          onClose={() => setError(null)}
        />
      )}
      {renderSection(
        t("book-recommendations"),
        recommendedBooks,
        loadingRecommended,
        "recommendations"
      )}
      {renderSection(
        t("donated-books"),
        donatedBooks,
        loadingDonated,
        "donations"
      )}
      {renderSection(
        t("borrowed-books"),
        borrowedBooks,
        loadingBorrowed,
        "requests"
      )}
    </Container>
  );
};

export default Dashboard;
