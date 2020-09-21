import React from "react";

import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { logoutCurrentUserStart } from "../../redux/user/user.actions";
import { logoutEmployeeStart } from "../../redux/employee/employee.actions";
import { toggleCartHidden } from "../../redux/cart/cart.actions";
import { toggleUserOptionsHidden } from "../../redux/user/user.actions";
import {
  selectCurrentUser,
  selectIsUserDropdownHidden,
} from "../../redux/user/user.selector";
import { selectCurrentEmployee } from "../../redux/employee/employee.selector";
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
      currentEmployee,
      userCart,
      logoutCurrentUserStart,
      logoutEmployeeStart,
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
          <Link to="/" className="link">
            <h5 className="navigation__option menu-dropdown__btn">Menu</h5>
          </Link>

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
        </div>
        {currentUser || currentEmployee ? (
          <div className="navigation__user-side">
            {currentUser && userCart ? (
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
            {currentUser ? (
              <h4
                className="navigation__option"
                onClick={logoutCurrentUserStart}
              >
                LOG OUT
              </h4>
            ) : (
              <h4 className="navigation__option" onClick={logoutEmployeeStart}>
                LOG OUT
              </h4>
            )}

            <div
              className="navigation__user-side--details"
              onClick={this.userHidden}
            >
              {currentUser ? (
                <div className="navigation__user-side--details">
                  <img
                    src={`/img/user/${currentUser.photo}`}
                    alt="user"
                    className="navigation__user-side--photo"
                  />

                  <h4 className="navigation__option">
                    {currentUser.name.split(" ")[0]}
                  </h4>
                  {isUserHidden ? <UserDropdown /> : null}
                </div>
              ) : null}

              {currentEmployee ? (
                <div>
                  <Link
                    to="/admin/main"
                    className="link navigation__user-side--details"
                  >
                    <img
                      src={`/img/user/${currentEmployee.photo}`}
                      alt="user"
                      className="navigation__user-side--photo"
                    />

                    <h4 className="navigation__option">
                      {currentEmployee.name.split(" ")[0]}
                    </h4>
                  </Link>
                </div>
              ) : null}
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
  currentEmployee: selectCurrentEmployee,
  userCart: selectUserCart,
  isCartHidden: selectIsCartHidden,
  isUserHidden: selectIsUserDropdownHidden,
});

const mapDispatchToProps = (dispatch) => ({
  logoutCurrentUserStart: () => dispatch(logoutCurrentUserStart()),
  logoutEmployeeStart: () => dispatch(logoutEmployeeStart()),
  toggleCartHidden: () => dispatch(toggleCartHidden()),
  fetchUserCartStart: () => dispatch(fetchUserCartStart()),
  toggleUserOptionsHidden: () => dispatch(toggleUserOptionsHidden()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
