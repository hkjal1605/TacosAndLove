import React from "react";

import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { logoutCurrentUserStart } from "../../redux/user/user.actions";
import { toggleCartHidden } from "../../redux/cart/cart.actions";
import { selectCurrentUser } from "../../redux/user/user.selector";
import {
  selectUserCart,
  selectIsCartHidden,
} from "../../redux/cart/cart.selector";
import { createStructuredSelector } from "reselect";

import { fetchUserCartStart } from "../../redux/cart/cart.actions";

import { ReactComponent as Cart } from "../../icons/cart.svg";

import "./navigation.styles.scss";

import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

class Navigation extends React.Component {
  componentDidMount() {
    const { currentUser, fetchUserCartStart } = this.props;

    if (currentUser) {
      fetchUserCartStart();
    }
  }

  cartHidden = () => {
    this.props.toggleCartHidden();
  };

  render() {
    const {
      currentUser,
      userCart,
      logoutCurrentUserStart,
      isCartHidden,
    } = this.props;
    let totalQuantity = 0;
    if (userCart) {
      userCart.items.map(
        (item) => (totalQuantity = totalQuantity + item.quantity)
      );
    }

    return (
      <div className="navigation">
        <div className="menu-dropdown">
          <Link to="/" className="link">
            <h5 className="navigation__option menu-dropdown__btn">Menu</h5>
          </Link>
          <div className="menu-dropdown__content">
            <Link to="/tacos" className="link">
              <h5 className="navigation__option menu-dropdown__option">
                Tacos
              </h5>
            </Link>
            <Link to="/burritos" className="link">
              <h5 className="navigation__option menu-dropdown__option">
                Burritos
              </h5>
            </Link>
            <Link to="/quesadilla" className="link">
              <h5 className="navigation__option menu-dropdown__option">
                Quesadilla
              </h5>
            </Link>
            <Link to="/sides" className="link">
              <h5 className="navigation__option menu-dropdown__option">
                Sides
              </h5>
            </Link>
            <Link to="/specialities" className="link">
              <h5 className="navigation__option menu-dropdown__option">
                Specialities
              </h5>
            </Link>
            <Link to="/deserts" className="link">
              <h5 className="navigation__option menu-dropdown__option">
                Deserts
              </h5>
            </Link>
          </div>
        </div>
        {currentUser ? (
          <div className="navigation__user-side">
            {userCart ? (
              <div
                className="navigation__user-side--cart"
                onClick={this.cartHidden}
              >
                <Cart className="navigation__user-side--icon" />
                {totalQuantity ? (
                  <span className="navigation__user-side--quantity">
                    {totalQuantity}
                  </span>
                ) : null}
                {isCartHidden ? <CartDropdown cart={userCart} /> : null}
              </div>
            ) : null}
            <h4 className="navigation__option" onClick={logoutCurrentUserStart}>
              LOG OUT
            </h4>
            <Link className="link" to="/profile">
              <div className="navigation__user-side--details">
                {currentUser.photo ? (
                  <img
                    src={`/img/user/${currentUser.photo}`}
                    alt="user"
                    className="navigation__user-side--photo"
                  />
                ) : null}
                <h4 className="navigation__option">
                  {currentUser.name.split(" ")[0]}
                </h4>
              </div>
            </Link>
          </div>
        ) : (
          <div className="navigation__user-side">
            <Link to="/login" className="link">
              <h5 className="navigation__option">Log In</h5>
            </Link>
            <Link to="/signup" className="link">
              <h5 className="navigation__option signup">Sign Up</h5>
            </Link>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  userCart: selectUserCart,
  isCartHidden: selectIsCartHidden,
});

const mapDispatchToProps = (dispatch) => ({
  logoutCurrentUserStart: () => dispatch(logoutCurrentUserStart()),
  toggleCartHidden: () => dispatch(toggleCartHidden()),
  fetchUserCartStart: () => dispatch(fetchUserCartStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
