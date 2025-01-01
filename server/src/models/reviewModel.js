const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
  {
    book_refId: { type: Schema.Types.ObjectId, ref: "Book" },
    user_refId: { type: Schema.Types.ObjectId, ref: "User" },
    rating: { type: Number, required: true, min: 1, max: 5 },
    review_text: { type: String, default: "" },
    date: { type: Date, default: Date.now },
  },
  { collection: "reviews" }
);

const Review = model("Review", reviewSchema);

module.exports = Review;
