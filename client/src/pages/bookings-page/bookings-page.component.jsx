import React from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { fetchUserBookingsStart } from "../../redux/booking/booking.actions";
import {
  selectBookingsList,
  selectIsBookingListFetching,
} from "../../redux/booking/booking.selectors";

import "./bookings-page.styles.scss";

import WithSpinner from "../../components/with-spinner/with-spinner.component";
import BookingsPreview from "../../components/bookings-preview/bookings-preview.component";

const BookingsPreviewWithSpinner = WithSpinner(BookingsPreview);

class BookingsPage extends React.Component {
  componentDidMount() {
    this.props.fetchUserBookingsStart();
  }
  render() {
    const { bookings, isBookingsLoading } = this.props;
    return (
      <div className="bookings-page">
        <div className="bookings-page__heading-container">
          <h2 className="bookings-page__heading">My Bookings</h2>
          <h5 className="bookings-page__sub-heading">
            Total Bookings: {bookings ? bookings.length : null}
          </h5>
        </div>
        <div className="bookings-page__content">
          {bookings ? (
            <BookingsPreviewWithSpinner
              isLoading={isBookingsLoading}
              bookings={bookings}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  bookings: selectBookingsList,
  isBookingsLoading: selectIsBookingListFetching,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUserBookingsStart: () => dispatch(fetchUserBookingsStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookingsPage);
