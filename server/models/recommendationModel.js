const { Schema, model } = require("mongoose");

const recommendationSchema = new Schema(
  {
    user_refId: { type: Schema.Types.ObjectId, refPath: "User" },
    recommendation_books: [{ type: Schema.Types.ObjectId, ref: "Book" }],
    generated_at: { type: Date, default: Date.now },
  },
  { collection: "recommendations" }
);

const Recommendation = model("Recommendation", recommendationSchema);

module.exports = Recommendation;
