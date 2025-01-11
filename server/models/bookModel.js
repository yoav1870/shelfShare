const { Schema, model } = require("mongoose");

const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String },
    genre: { type: String },
    donor_refId: { type: Schema.Types.ObjectId, refPath: "User" },
    status: {
      type: String,
      enum: ["Available", "Borrowed", "Reserved"],
      default: "Available",
    },
    state: {
      type: String,
      enum: ["new", "like new", "used", "heavily used"],
      required: true,
    },

    pics: [{ type: String }],
    location: { type: String },
    metadata: { type: Schema.Types.Mixed },
  },
  { collection: "books" }
);

bookSchema.index({ title: "text" });

const Book = model("Book", bookSchema);
module.exports = Book;
