const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
    password: { type: String, required: true },
    preferences: {
      favoriteGenres: [String],
      favoriteAuthors: [String],
      viewedBooks: [{ type: Schema.Types.ObjectId, ref: "Book" }],
    },
    donation_history: [
      {
        book: { type: Schema.Types.ObjectId, ref: "Book" },
        donatedAt: { type: Date, default: Date.now },
      },
    ],
    request_history: [
      {
        book: { type: Schema.Types.ObjectId, ref: "Book" },
        requestedAt: { type: Date, default: Date.now },
      },
    ],
    liked_books: [{ type: Schema.Types.ObjectId, ref: "Book" }],
  },
  { collection: "users" }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const SALT_ROUNDS = 10;
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);
module.exports = User;
