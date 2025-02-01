const User = require("../models/userModel");
const Book = require("../models/bookModel");
const admin = require("../config/firebaseAdmin");

class NotificationService {
  static async notifyUsersAboutBook(bookTitle) {
    try {
      const books = await Book.find({ title: bookTitle });
      if (!books.length) {
        return;
      }
      const bookIds = books.map((book) => book._id);
      const usersToNotify = await User.find({ liked_books: { $in: bookIds } });

      if (!usersToNotify.length) {
        return;
      }

      for (const user of usersToNotify) {
        if (user.fcmToken) {
          const message = {
            token: user.fcmToken,
            notification: {
              title: "Book Available!",
              body: `A book titled "${bookTitle}" is now available.`,
            },
            data: {
              title: "Book Available!",
              body: `A book titled "${bookTitle}" is now available.`,
            },
          };

          try {
            await admin.messaging().send(message);
          } catch (err) {
            console.error("Error sending message:", err);
          }
        } else {
          console.log(`User ${user.email} has no FCM token.`);
        }
      }
    } catch (error) {
      console.error("Error notifying users about book:", error);
    }
  }
}

module.exports = NotificationService;
