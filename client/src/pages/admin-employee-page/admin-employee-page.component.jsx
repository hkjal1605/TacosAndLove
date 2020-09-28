import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./admin-employee-page.styles.scss";

import { getAllEmployeesStart } from "../../redux/admin/admin.actions";
import { selectIsEmployeesFetching } from "../../redux/admin/admin.selectors";

import WithSpinner from "../../components/with-spinner/with-spinner.component";
import AdminEmployees from "../../components/admin-employees/admin-employees.component";

const AdminEmployeesWithSpinner = WithSpinner(AdminEmployees);

class AdminEmployeePage extends React.Component {
  componentDidMount() {
    this.props.getAllEmployeesStart();
  }
  render() {
    return (
      <div className="admin-employee-page">
        <h2 className="admin-employee-page__heading">
          <Link to="/admin/main" className="link">
            <span className="admin-employee-page__back-btn">&#8610; Back</span>
          </Link>
          EMPLOYEES IN YOUR RESTAURANT
        </h2>
        <AdminEmployeesWithSpinner isLoading={this.props.isEmployeesLoading} />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isEmployeesLoading: selectIsEmployeesFetching,
});

const mapDispatchToProps = (dispatch) => ({
  getAllEmployeesStart: () => dispatch(getAllEmployeesStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminEmployeePage);
