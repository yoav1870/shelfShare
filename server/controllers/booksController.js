const { get } = require("mongoose");
const Book = require("../models/bookModel");
const User = require("../models/userModel");
const {
  fetchBookDataById,
  generateNBooks,
} = require("../services/googleBooksService");
const { getRecommendations } = require("../services/recommendationService");

const booksController = {
  async getAllBooks(req, res) {
    try {
      const books = await Book.find({});
      res.status(200).json(books);
    } catch (err) {
      console.error("Error fetching books:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async addBook(req, res) {
    try {
      const { title, state, author, genre, metadata, pics, location } =
        req.body;

      if (!title || !state) {
        return res
          .status(400)
          .json({ error: "Please provide title and state" });
      }

      const fetchedBookData = await fetchBookDataById(title);

      const book = new Book({
        title: fetchedBookData?.title || title.trim().toLowerCase(),
        author: fetchedBookData?.authors || author || "Unknown",
        genre: fetchedBookData?.categories || genre || "Uncategorized",
        donor_refId: req.user.id,
        status: "Available",
        state,
        pics: pics || [],
        location: location || "Not specified",
        metadata: metadata || {
          description:
            fetchedBookData?.description || "No description available.",
          publisher: fetchedBookData?.publisher || "Unknown",
          publishedDate: fetchedBookData?.publishedDate || "Unknown",
          pageCount: fetchedBookData?.pageCount || 0,
          thumbnail: fetchedBookData?.thumbnail || null,
        },
      });
      await book.save();
      res.status(201).json("Book added successfully");
    } catch (err) {
      console.error("Error adding book:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async searchBookByTitle(req, res) {
    try {
      const { title } = req.params;
      if (!title) {
        return res.status(400).json({ error: "Please provide title" });
      }
      const books = await Book.find({ $text: { $search: title } });
      if (books.length === 0) {
        const fetchedBook = await fetchBookDataById(title);
        if (fetchedBook) {
          return res.status(200).json(fetchedBook);
        } else return res.status(404).json({ error: "Book not found" });
      } else res.status(200).json(books);
    } catch (err) {
      console.error("Error searching book by title:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async requestBook(req, res) {
    try {
      const { bookId } = req.body;
      const requesterId = req.user.id;
      if (!bookId) {
        return res.status(400).json({ error: "Book ID is required" });
      }
      const book = await Book.findById(bookId).populate("donor_refId");
      if (!book) {
        return res.status(404).json({ error: "Book not found" });
      }

      const donorId = book.donor_refId;
      if (!donorId) {
        return res
          .status(400)
          .json({ error: "Book does not have an associated donor" });
      }

      const requester = await User.findById(requesterId);
      if (!requester) {
        return res.status(404).json({ error: "Requester not found" });
      }

      const donor = await User.findById(donorId);
      if (!donor) {
        return res.status(404).json({ error: "Donor not found" });
      }

      book.status = "Reserved";
      await book.save();

      requester.request_history.push({ book: bookId, requestedAt: Date.now() });
      await requester.save();

      donor.donation_history.push({ book: bookId, donatedAt: Date.now() });
      await donor.save();

      res.status(200).json({
        message: "Book successfully added to request and donation histories",
        requester,
        donor,
        bookStatus: book.status,
      });
    } catch (err) {
      res.status(500).json({ error: "Internal server error" + err });
    }
  },

  async getRecommendedBooks(req, res) {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
      }

      const books = await getRecommendations(userId);

      if (books.length === 0) {
        return res.status(404).json({ message: "No books available" });
      }
      res.status(200).json(books);
    } catch (err) {
      res.status(500).json({ error: "Internal server error: " + err.message });
    }
  },

  async likeBook(req, res) {
    try {
      const { bookId } = req.body;
      const userId = req.user?.id;

      if (!bookId) {
        return res.status(400).json({ error: "Book ID is required" });
      }

      const book = await Book.findById(bookId);
      if (!book) {
        return res.status(404).json({ error: "Book not found" });
      }

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      if (user.liked_books.includes(bookId)) {
        return res.status(400).json({ error: "Book already liked" });
      }

      user.liked_books.push(bookId);
      await user.save();
      res.status(200).json({ message: "Book liked successfully", user });
    } catch (err) {
      res.status(500).json({ error: "Internal server error: " + err.message });
    }
  },

  async unlikeBook(req, res) {
    try {
      const { bookId } = req.body;
      const userId = req.user?.id;

      if (!bookId) {
        return res.status(400).json({ error: "Book ID is required" });
      }

      const book = await Book.findById(bookId);
      if (!book) {
        return res.status(404).json({ error: "Book not found" });
      }

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      if (!user.liked_books.includes(bookId)) {
        return res.status(400).json({ error: "Book not liked" });
      }

      user.liked_books = user.liked_books.filter((id) => id !== bookId);
      await user.save();
      res.status(200).json({ message: "Book unliked successfully", user });
    } catch (err) {
      res.status(500).json({ error: "Internal server error: " + err.message });
    }
  },

  async getLikedBooks(req, res) {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
      }

      const user = await User.findById(userId).populate("liked_books");
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json(user.liked_books);
    } catch (err) {
      res.status(500).json({ error: "Internal server error: " + err.message });
    }
  },

  async searchBookByGenre(req, res) {
    try {
      const { genre } = req.params;

      if (!genre) {
        return res.status(400).json({ error: "Genre is required" });
      }

      const books = await Book.find({ genre: genre });
      if (books.length === 0) {
        return res.status(404).json({ error: "No books found" });
      }

      res.status(200).json(books);
    } catch (err) {
      res.status(500).json({ error: "Internal server error: " + err.message });
    }
  },
};

module.exports = { booksController };
