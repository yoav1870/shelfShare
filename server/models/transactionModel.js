const { Schema, model } = require("mongoose");

const transactionSchema = new Schema(
  {
    book_refId: { type: Schema.Types.ObjectId, ref: "Book" },
    donor_refId: { type: Schema.Types.ObjectId, ref: "User" },
    requester_refId: { type: Schema.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      enum: ["Requested", "Accepted", "Rejected", "Returned"],
      default: "Requested",
    },
    date: { type: Date, default: Date.now },
  },
  { collection: "transactions" }
);

const Transaction = model("Transaction", transactionSchema);

module.exports = Transaction;
