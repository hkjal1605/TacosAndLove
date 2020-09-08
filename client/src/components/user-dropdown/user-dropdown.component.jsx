import React from "react";

import { Link } from "react-router-dom";

import CustomButton from "../custom-button/custom-button.component";
import { ReactComponent as Order } from "../../icons/order.svg";

import "./user-dropdown.styles.scss";

const UserDropdown = () => {
  return (
    <div className="user-dropdown">
      <Link to="/my-orders" className="link">
        <div className="user-dropdown__option-container">
          <Order className="user-dropdown__option-container--icon" />
          <CustomButton
            content="My Orders"
            btnClass="user-dropdown__option-container--button"
          />
        </div>
      </Link>
    </div>
  );
};

export default UserDropdown;
