import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./admin-kitchen-page.styles.scss";
import { fetchMenuStart } from "../../redux/menu/menu.actions";
import { selectIsMenuListFetching } from "../../redux/menu/menu.selector";

import WithSpinner from "../../components/with-spinner/with-spinner.component";
import AdminKitchen from "../../components/admin-kitchen/admin-kitchen.component";

const AdminKitchenWithSpinner = WithSpinner(AdminKitchen);

class AdminKitchenPage extends React.Component {
  componentDidMount() {
    const { fetchMenuStart } = this.props;
    fetchMenuStart();
  }

  render() {
    return (
      <div className="admin-kitchen-page">
        <AdminKitchenWithSpinner isLoading={this.props.isMenuLoading} />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isMenuLoading: selectIsMenuListFetching,
});

const mapDispatchToProps = (dispatch) => ({
  fetchMenuStart: () => dispatch(fetchMenuStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminKitchenPage);
