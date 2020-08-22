import React from "react";

import { connect } from "react-redux";

import "./item-card.styles.scss";

import CustomButton from "../custom-button/custom-button.component";

import { addToCartStart } from "../../redux/cart/cart.actions";

const ItemCard = ({ item, itemName, addToCartStart }) => {
  return (
    <div
      className={
        item.fill === "veg" ? "item-card card-veg" : "item-card card-non-veg"
      }
    >
      <img src={`/img/${item.image}`} alt="item" className="item-card__image" />
      <div className="item-card__name-container">
        <h3 className="item-card__name">{`${item.name}`}</h3>
        <h4
          className={item.fill === "veg" ? "veg" : "non-veg"}
        >{`(${item.fill})`}</h4>
      </div>
      <h5 className="item-card__price">&#8377;{` ${item.price}`}</h5>
      <CustomButton
        content="Add to Cart"
        onClick={() => addToCartStart(itemName, item._id)}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addToCartStart: (itemName, itemId) =>
    dispatch(addToCartStart(itemName, itemId)),
});

export default connect(null, mapDispatchToProps)(ItemCard);
