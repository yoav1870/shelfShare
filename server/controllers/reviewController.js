const Review = require("../models/reviewModel");
const Book = require("../models/bookModel");
const User = require("../models/userModel");

const reviewController = {
  async addReview(req, res) {
    try {
      const { bookId, rating, review_text } = req.body;
      const userId = req.user.id;
      if (!bookId || !rating) {
        return res
          .status(400)
          .json({ error: "Book ID and rating are required" });
      }
      const book = await Book.findById(bookId);
      if (!book) {
        return res.status(404).json({ error: "Book not found" });
      }
      const existingReview = await Review.findOne({
        book_refId: bookId,
        user_refId: userId,
      });
      if (existingReview) {
        return res
          .status(400)
          .json({ error: "You have already reviewed this book" });
      }
      const review = new Review({
        book_refId: bookId,
        user_refId: userId,
        rating,
        review_text,
      });
      await review.save();
      await updateBookRating(bookId);

      if (rating >= 4) {
        await User.findByIdAndUpdate(
          userId,
          {
            $addToSet: {
              "preferences.favoriteGenres": book.genre,
              "preferences.favoriteAuthors": book.author,
            },
          },
          { new: true }
        );
      }

      res.status(201).json(review);
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async getReviewsByBook(req, res) {
    try {
      const { bookId } = req.params;

      const reviews = await Review.find({ book_refId: bookId })
        .populate("user_refId", "name email")
        .select("rating review_text date");

      res.status(200).json(reviews);
    } catch (err) {
      console.error("Error fetching reviews:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async updateReview(req, res) {
    try {
      const { reviewId } = req.params;
      const { rating, review_text } = req.body;
      const userId = req.user.id;

      const review = await Review.findOneAndUpdate(
        { _id: reviewId, user_refId: userId },
        { rating, review_text },
        { new: true }
      );

      if (!review) {
        return res
          .status(404)
          .json({ error: "Review not found or not yours to update" });
      }

      await updateBookRating(review.book_refId);

      res.status(200).json(review);
    } catch (err) {
      console.error("Error updating review:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async deleteReview(req, res) {
    try {
      const { reviewId } = req.params;
      const userId = req.user.id;

      const review = await Review.findOneAndDelete({
        _id: reviewId,
        user_refId: userId,
      });

      if (!review) {
        return res
          .status(404)
          .json({ error: "Review not found or not yours to delete" });
      }

      await updateBookRating(review.book_refId);

      res.status(200).json({ message: "Review deleted successfully" });
    } catch (err) {
      console.error("Error deleting review:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

const updateBookRating = async (bookId) => {
  const reviews = await Review.find({ book_refId: bookId });
  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length ||
    0;

  await Book.findByIdAndUpdate(bookId, { averageRating });
};

module.exports = { reviewController };
