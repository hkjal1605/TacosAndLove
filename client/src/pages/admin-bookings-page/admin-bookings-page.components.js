import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { getAllBookingsStart } from "../../redux/admin/admin.actions";
import { selectIsBookingsFetching } from "../../redux/admin/admin.selectors";

import AdminBookings from "../../components/admin-bookings/admin-bookings.component";
import WithSpinner from "../../components/with-spinner/with-spinner.component";

import "./admin-bookings-page.styles.scss";

const AdminBookingsWithSpinner = WithSpinner(AdminBookings);

class AdminBookingsPage extends React.Component {
  componentDidMount() {
    this.props.getAllBookingsStart();
  }
  render() {
    return (
      <div className="admin-bookings-page">
        <h2 className="admin-bookings-page__heading">
          <Link to="/admin/main" className="link">
            <span className="admin-bookings-page__back-btn">&#8610; Back</span>
          </Link>
          ORDERS RECIEVED TILL NOW
        </h2>
        <AdminBookingsWithSpinner isLoading={this.props.isBookingsFetching} />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isBookingsFetching: selectIsBookingsFetching,
});

const mapDispatchToProps = (dispatch) => ({
  getAllBookingsStart: () => dispatch(getAllBookingsStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminBookingsPage);
