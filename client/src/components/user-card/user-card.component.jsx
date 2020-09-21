import React from "react";

import "./user-card.styles.scss";

const UserCard = ({ user }) => {
  return (
    <div className="user-card">
      <h5 className="user-card__title">Ordered By</h5>
      <img
        src={`/img/user/${user.photo}`}
        className="user-card__photo"
        alt="user"
      />
      <h5 className="user-card__name">{user.name}</h5>
      <h5 className="user-card__email">{user.email}</h5>
    </div>
  );
};

export default UserCard;
