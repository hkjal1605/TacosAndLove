import React from "react";

import { Link } from "react-router-dom";

import CustomButton from "../custom-button/custom-button.component";

import "./cart-dropdown.styles.scss";

const CartDropdown = ({ cart }) => {
  return (
    <div className="cart-dropdown">
      {cart.items.map((item) => (
        <div className="cart-dropdown__item-container">
          <img
            src={`/img/${item.image}`}
            alt="cart-item"
            className="cart-dropdown__item-img"
          />
          <h5 className="cart-dropdown__item-name">{item.name}</h5>
          <span className="cart-dropdown__item-quantity">{`X ${item.quantity}`}</span>
        </div>
      ))}
      <Link to="/checkout" className="link">
        <CustomButton
          content="Proceed To Checkout"
          btnClass="cart-dropdown__button"
        />
      </Link>
    </div>
  );
};

export default CartDropdown;
