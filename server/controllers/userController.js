const User = require("../models/userModel");
const Review = require("../models/reviewModel");
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

  async getUserDetails(req, res) {
    try {
      const userId = req.user.id;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const currentYear = new Date().getFullYear();

      const donationsByMonth = Array(12).fill(0);
      const requestsByMonth = Array(12).fill(0);

      for (const donation of user.donation_history) {
        const donationDate = new Date(donation.donatedAt);
        if (donationDate.getFullYear() === currentYear) {
          donationsByMonth[donationDate.getMonth()] += 1;
        }
      }

      for (const request of user.request_history) {
        const requestDate = new Date(request.requestedAt);
        if (requestDate.getFullYear() === currentYear) {
          requestsByMonth[requestDate.getMonth()] += 1;
        }
      }

      const reviews = await Review.find({ user_refId: userId }).populate(
        "book_refId",
        "genre"
      );

      const genreCounts = {};
      let likedReviewsCount = 0;

      reviews.forEach((review) => {
        if (review.rating >= 4) {
          likedReviewsCount++;
          const genre = review.book_refId?.genre || "Unknown";
          genreCounts[genre] = (genreCounts[genre] || 0) + 1;
        }
      });

      const totalLikedReviews = likedReviewsCount || 1;
      const likedGenresPercentage = Object.entries(genreCounts).map(
        ([genre, count]) => ({
          genre,
          percentage: ((count / totalLikedReviews) * 100).toFixed(2),
        })
      );

      const totalDonations = user.donation_history.length;
      const totalRequests = user.request_history.length;
      const totalBooksReviewed = reviews.length;

      const userDetails = {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
        statistics: {
          donationsByMonth,
          requestsByMonth,
          totalDonations,
          totalRequests,
          totalBooksReviewed,
          likedGenresPercentage,
        },
      };

      res.status(200).json(userDetails);
    } catch (err) {
      console.error("Error fetching user details:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  async saveFCMToken(req, res) {
    try {
      const { userId, fcmToken } = req.body;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      user.fcmToken = fcmToken;
      await user.save();
      res.status(200).json({ message: "FCM token saved successfully" });
    } catch (err) {
      console.error("Error saving FCM token:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = { userController };
