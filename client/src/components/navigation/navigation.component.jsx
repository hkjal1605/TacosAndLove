import React from "react";

import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { logoutCurrentUserStart } from "../../redux/user/user.actions";
import { toggleCartHidden } from "../../redux/cart/cart.actions";
import { toggleUserOptionsHidden } from "../../redux/user/user.actions";
import {
  selectCurrentUser,
  selectIsUserDropdownHidden,
} from "../../redux/user/user.selector";
import {
  selectUserCart,
  selectIsCartHidden,
} from "../../redux/cart/cart.selector";

import { createStructuredSelector } from "reselect";

import { fetchUserCartStart } from "../../redux/cart/cart.actions";

import { ReactComponent as Cart } from "../../icons/cart.svg";

import "./navigation.styles.scss";

import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import UserDropdown from "../../components/user-dropdown/user-dropdown.component";

class Navigation extends React.Component {
  constructor() {
    super();

    this.state = {
      dropdownHidden: true,
    };
  }
  componentDidMount() {
    const { currentUser, fetchUserCartStart } = this.props;

    if (currentUser) {
      fetchUserCartStart();
    }
  }

  cartHidden = () => {
    this.props.toggleCartHidden();
  };

  userHidden = () => {
    this.props.toggleUserOptionsHidden();
  };

  toggleMenuDropdown = () => {
    const { dropdownHidden } = this.state;
    this.setState({ dropdownHidden: !dropdownHidden });
    console.log(this.state);
  };

  render() {
    const {
      currentUser,
      userCart,
      logoutCurrentUserStart,
      isCartHidden,
      isUserHidden,
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
          <h5
            className="navigation__option menu-dropdown__btn"
            onClick={this.toggleMenuDropdown}
          >
            Menu
          </h5>

          {this.state.dropdownHidden ? null : (
            <div className="menu-dropdown__content">
              <Link to="/menu/tacos" className="link">
                <h5
                  className="navigation__option menu-dropdown__option"
                  onClick={this.toggleMenuDropdown}
                >
                  Tacos
                </h5>
              </Link>
              <Link to="/menu/burritos" className="link">
                <h5
                  className="navigation__option menu-dropdown__option"
                  onClick={this.toggleMenuDropdown}
                >
                  Burritos
                </h5>
              </Link>
              <Link to="/menu/quesadilla" className="link">
                <h5
                  className="navigation__option menu-dropdown__option"
                  onClick={this.toggleMenuDropdown}
                >
                  Quesadilla
                </h5>
              </Link>
              <Link to="/menu/sides" className="link">
                <h5
                  className="navigation__option menu-dropdown__option"
                  onClick={this.toggleMenuDropdown}
                >
                  Sides
                </h5>
              </Link>
              <Link to="/menu/specialities" className="link">
                <h5
                  className="navigation__option menu-dropdown__option"
                  onClick={this.toggleMenuDropdown}
                >
                  Specialities
                </h5>
              </Link>
              <Link to="/menu/deserts" className="link">
                <h5
                  className="navigation__option menu-dropdown__option"
                  onClick={this.toggleMenuDropdown}
                >
                  Deserts
                </h5>
              </Link>
            </div>
          )}
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
            <div
              className="navigation__user-side--details"
              onClick={this.userHidden}
            >
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
              {isUserHidden ? <UserDropdown /> : null}
            </div>
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
  isUserHidden: selectIsUserDropdownHidden,
});

const mapDispatchToProps = (dispatch) => ({
  logoutCurrentUserStart: () => dispatch(logoutCurrentUserStart()),
  toggleCartHidden: () => dispatch(toggleCartHidden()),
  fetchUserCartStart: () => dispatch(fetchUserCartStart()),
  toggleUserOptionsHidden: () => dispatch(toggleUserOptionsHidden()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
