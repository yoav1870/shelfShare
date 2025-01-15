const User = require("../models/userModel");

const userController = {
  async getBooksDonatedByUser(req, res) {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId).populate({
        path: "donation_history.book",
        select: "title genre",
      });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const donatedBooks = user.donation_history.map((donation) => ({
        title: donation.book?.title || "Unknown",
        genre: donation.book?.genre || "Unknown",
        date: donation.donatedAt,
      }));
      res.status(200).json(donatedBooks);
    } catch (err) {
      res.status(500).json({ error: "Internal server error" + err });
    }
  },

  async getBooksRequestedByUser(req, res) {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId).populate({
        path: "request_history.book",
        select: "title genre",
      });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const requestedBooks = user.request_history.map((request) => ({
        title: request.book?.title || "Unknown",
        genre: request.book?.genre || "Unknown",
        date: request.requestedAt,
      }));
      res.status(200).json(requestedBooks);
    } catch (err) {
      res.status(500).json({ error: "Internal server error" + err });
    }
  },

  async getUserDetails(req, res) {},
};

module.exports = { userController };
