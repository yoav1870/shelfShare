const User = require("../models/userModel");
const Book = require("../models/bookModel");
const Review = require("../models/reviewModel");
const { getRandomDate } = require("../utils/tools");

const adminController = {
  async getUsersData(req, res) {
    try {
      const users = await User.find();
      const months = Array(12).fill(0);

      for (const user of users) {
        const createdAt =
          user?.createdAt || getRandomDate(new Date("2020-01-01"), new Date());
        const month = createdAt.getMonth();
        months[month] += 1;
      }

      const usersData = {
        usersCount: await User.countDocuments(),
        months,
      };
      res.status(200).json(usersData);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  async getBooksData(req, res) {
    try {
      const booksData = {
        resBooks: await Book.countDocuments({ status: "Reserved" }),
        borBooks: await Book.countDocuments({ status: "Borrowed" }),
        availableBooks: await Book.countDocuments({ status: "Available" }),
        booksCount: await Book.countDocuments(),
        newBooks: await Book.countDocuments({ state: "new" }),
        likeNewBooks: await Book.countDocuments({ state: "like new" }),
        usedBooks: await Book.countDocuments({ state: "used" }),
        heavilyUsedBooks: await Book.countDocuments({
          state: "heavily used",
        }),
      };

      res.status(200).json(booksData);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async getReviewsData(req, res) {
    try {
      const reviews = await Review.find();
      const ratings = Array(5).fill(0);
      for (const review of reviews) {
        ratings[review.rating - 1] += 1;
      }

      const reviewsData = {
        reviewsCount: await Review.countDocuments(),
        ratings,
      };
      res.status(200).json(reviewsData);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  async getSuspiciousReviews(req, res) {
    try {
      const suspiciousReviews = await Review.find({ susReview: true })
        .populate("book_refId", "title author")
        .populate("user_refId", "name email")
        .select("rating review_text susReview date");

      res.status(200).json(suspiciousReviews);
    } catch (err) {
      console.error("Error fetching suspicious reviews:", err.message);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = { adminController };
