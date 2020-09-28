import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./employee-update-page.styles.scss";

import { getEmployeeStart } from "../../redux/admin/admin.actions";
import { selectisEmployeeFetching } from "../../redux/admin/admin.selectors";
import { selectCurrentEmployee } from "../../redux/employee/employee.selector";

import WithSpinner from "../../components/with-spinner/with-spinner.component";
import EmployeeUpdate from "../../components/employee-update/employee-update.component";

const EmployeeUpdateWithSpinner = WithSpinner(EmployeeUpdate);

class EmployeeUpdatePage extends React.Component {
  componentDidMount() {
    const { match, getEmployeeStart } = this.props;
    console.log(match);
    getEmployeeStart(match.params.employeeId);
  }

  render() {
    const { currentEmployee } = this.props;
    return (
      <div className="employee-update-page">
        {currentEmployee && currentEmployee.role === "owner" ? (
          <EmployeeUpdateWithSpinner
            isLoading={this.props.isEmployeeFetching}
          />
        ) : (
          <h1>YOU DONOT HAVE PERMISSIONS TO ACCESS THIS PAGE</h1>
        )}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isEmployeeFetching: selectisEmployeeFetching,
  currentEmployee: selectCurrentEmployee,
});

const mapDispatchToProps = (dispatch) => ({
  getEmployeeStart: (employeeId) => dispatch(getEmployeeStart(employeeId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeUpdatePage);
