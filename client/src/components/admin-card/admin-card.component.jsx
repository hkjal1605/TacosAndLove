import React from "react";

import "./admin-card.styles.scss";

import Waiter from "./waiter.jpg";
import Orders from "./restaurant.jpg";
import Kitchen from "./kitchen.jpg";

const imageObject = {
  employees: Waiter,
  orders: Orders,
  kitchen: Kitchen,
};

const AdminCard = ({ type }) => {
  return (
    <div className="admin-card">
      <div className="admin-card__image-container">
        <img src={imageObject[type]} alt={type} className="admin-card__image" />
      </div>
      <div className="admin-card__details">
        <h3 className="admin-card__details--title">View {type}</h3>
      </div>
    </div>
  );
};

export default AdminCard;
