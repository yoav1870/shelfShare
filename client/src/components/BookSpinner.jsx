import React from "react";
import "../styles/BookSpinner.css";

const BookSpinner = () => {
  return (
    <div className="book-spinner-container">
      <div className="book-spinner">
        <div className="page"></div>
        <div className="page"></div>
        <div className="page"></div>
      </div>
    </div>
  );
};

export default BookSpinner;
