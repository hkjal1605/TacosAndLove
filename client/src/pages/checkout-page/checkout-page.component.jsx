import React from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectUserCart } from "../../redux/cart/cart.selector";

import "./checkout-page.styles.scss";

import {
  addToCartStart,
  removeFromCartStart,
} from "../../redux/cart/cart.actions";

import { getCheckoutSessionStart } from "../../redux/booking/booking.actions";

class CheckoutPage extends React.Component {
  render() {
    const {
      cart,
      addToCartStart,
      removeFromCartStart,
      getCheckoutSessionStart,
    } = this.props;
    return (
      <div className="checkout-page">
        <h2 className="checkout-page__heading">YOUR BAG</h2>
        <span className="checkout-page__subtext">{`Summary of ${cart.items.length} items.`}</span>
        <div className="checkout-page__item-list">
          {cart.items.map((item) => (
            <div key={item._id} className="checkout-page__item-details">
              <img
                src={`/img/${item.image}`}
                alt={`${item.name}`}
                className="checkout-page__item-details--image"
              />
              <h5 className="checkout-page__item-details--name">{item.name}</h5>
              <div className="checkout-page__item-details--quantity-container">
                <h5
                  className="checkout-page__item-details--add"
                  onClick={() =>
                    removeFromCartStart(item.category_name, item._id)
                  }
                >
                  &#8918;
                </h5>
                <h5 className="checkout-page__item-details--quantity">{`Quantity: ${item.quantity}`}</h5>
                <h5
                  className="checkout-page__item-details--add"
                  onClick={() => addToCartStart(item.category_name, item._id)}
                >
                  &#8919;
                </h5>
              </div>
              <span className="checkout-page__item-details--price">
                &#8377;{` ${item.price * item.quantity}`}
              </span>
            </div>
          ))}
        </div>
        <div className="checkout-page__total-details">
          <h4 className="checkout-page__total-details--heading">
            TOTAL: &#8377;{` ${cart.total}`}
          </h4>

          <button
            className="checkout-page__total-details--button"
            onClick={() => getCheckoutSessionStart(cart._id)}
          >
            Pay Now
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  cart: selectUserCart,
});

const mapDispatchToProps = (dispatch) => ({
  addToCartStart: (itemName, itemId) =>
    dispatch(addToCartStart(itemName, itemId)),
  removeFromCartStart: (itemName, itemId) =>
    dispatch(removeFromCartStart(itemName, itemId)),
  getCheckoutSessionStart: (cartId) =>
    dispatch(getCheckoutSessionStart(cartId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);
