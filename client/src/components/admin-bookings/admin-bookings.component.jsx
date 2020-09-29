import React from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import "./admin-bookings.styles.scss";

import { selectAllBookings } from "../../redux/admin/admin.selectors";

import BookingsCard from "../bookings-card/bookings-card.component";
import UserCard from "../user-card/user-card.component";

class AdminBookings extends React.Component {
  state = {
    itemsShown: false,
  };

  showItems = () => {
    const { itemsShown } = this.state;
    this.setState({ itemsShown: !itemsShown });
  };

  render() {
    const { bookings } = this.props;
    return (
      <div className="admin-bookings" id="admin-bookings">
        <div className="admin-bookings__title">
          <h4 className="admin-bookings__title--name booking-id">Order Id</h4>
          <h4 className="admin-bookings__title--name date">Ordered At</h4>
          <h4 className="admin-bookings__title--name amount">Amount</h4>
          <h4 className="admin-bookings__title--name items">Details</h4>
        </div>
        {bookings
          ? bookings.map((booking, i) => (
              <div
                className={
                  i % 2 === 0
                    ? "admin-bookings__content even"
                    : "admin-bookings__content odd"
                }
                key={booking._id}
              >
                <h4 className="admin-bookings__content--name booking-id">
                  {booking._id}
                </h4>
                <h4 className="admin-bookings__content--name date">
                  {new Date(booking.createdAt).toString().split(" ")[1]}{" "}
                  {new Date(booking.createdAt).toString().split(" ")[2]}
                  {", "}
                  {new Date(booking.createdAt).toString().split(" ")[3]}
                </h4>
                <h4 className="admin-bookings__content--name amount">
                  &#8377;{booking.amount}
                </h4>
                <a
                  href={`#popup-${i}`}
                  className="admin-bookings__content--name items"
                  onClick={this.showItems}
                >
                  Click To View
                </a>

                <div className="admin-bookings__popup" id={`popup-${i}`}>
                  <div className="admin-bookings__popup--content">
                    <BookingsCard booking={booking} />
                    <UserCard user={booking.customer} />
                    <a
                      href="#admin-bookings"
                      className="admin-bookings__popup--close"
                    >
                      &times;
                    </a>
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  bookings: selectAllBookings,
});

export default connect(mapStateToProps)(AdminBookings);
