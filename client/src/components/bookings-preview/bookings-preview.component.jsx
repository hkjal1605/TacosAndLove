import React from "react";

import "./bookings-preview.styles.scss";

import BookingCard from "../bookings-card/bookings-card.component";

const BookingsPreview = ({ bookings }) => {
  return (
    <div className="bookings-preview">
      {bookings.map((booking) => (
        <BookingCard key={booking._id} booking={booking} />
      ))}
    </div>
  );
};

export default BookingsPreview;
