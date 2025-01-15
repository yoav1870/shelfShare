const Book = require("../models/bookModel");
const { fetchBookDataById } = require("../services/googleBooksService");

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
};

module.exports = { booksController };
