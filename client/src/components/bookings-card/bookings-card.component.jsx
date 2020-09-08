import React from "react";

import "./booking-card.styles.scss";

const BookingCard = ({ booking }) => {
  return (
    <div className="booking-card">
      <div className="booking-card__items-list">
        <h3 className="booking-card__items-list--heading">ITEMS:</h3>
        {booking.items.map((item, i) => (
          <div key={i} className="booking-card__items-list--item">
            <img
              src={item.image[0]}
              className="booking-card__items-list--image"
            />
            <h5 className="booking-card__items-list--name">{item.name}</h5>
            <span className="booking-card__items-list--quantity">
              X {item.quantity}
            </span>
          </div>
        ))}
      </div>
      <div className="booking-card__bottom">
        <div className="booking-card__amount">
          Amount Paid: {booking.amount}
        </div>
        <span className="booking-card__time">
          Ordered At:{" "}
          {`${Date(booking.createdAt).split(" ")[0]} ${
            Date(booking.createdAt).split(" ")[1]
          } ${Date(booking.createdAt).split(" ")[2]} ${
            Date(booking.createdAt).split(" ")[3]
          }`}
        </span>
      </div>
    </div>
  );
};

export default BookingCard;
