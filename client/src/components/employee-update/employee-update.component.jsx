import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./employee-update.styles.scss";

import { updateEmployeeStart } from "../../redux/admin/admin.actions";
import {
  selectEmployee,
  selectIsEmployeeUpdating,
} from "../../redux/admin/admin.selectors";

import FormInput from "../form-input/form-input.component";

import CustomButton from "../custom-button/custom-button.component";

class EmployeeUpdate extends React.Component {
  state = {
    email: this.props.employee ? this.props.employee.email : null,
    role: this.props.employee ? this.props.employee.role : null,
    salary: this.props.employee ? this.props.employee.salary : null,
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { employee, updateEmployeeStart } = this.props;

    updateEmployeeStart(employee._id, this.state);
  };

  render() {
    const { employee, isUpdating } = this.props;
    return (
      <div className="employee-update main">
        <h2 className="employee-update__heading">UPDATE EMPLOYEE DETAILS</h2>
        {employee ? (
          <div className="employee-update">
            <div className="employee-update__left">
              <img
                src={`/img/user/${employee.photo}`}
                alt="Employee"
                className="employee-update__left--image"
              />
              <h2 className="employee-update__left--name">{employee.name}</h2>
            </div>
            <div className="employee-update__right">
              <form
                className="employee-update__form"
                onSubmit={this.handleSubmit}
              >
                <FormInput
                  name="email"
                  type="email"
                  value={this.state.email}
                  label="Update Email"
                  handleChange={this.handleChange}
                />
                <FormInput
                  name="role"
                  type="text"
                  value={this.state.role}
                  label="Update Role"
                  handleChange={this.handleChange}
                />
                <FormInput
                  name="salary"
                  type="text"
                  value={this.state.salary}
                  label="Update Salary"
                  handleChange={this.handleChange}
                />

                <div className="employee-update__buttons-group">
                  <CustomButton
                    type="submit"
                    btnClass="employee-update__button"
                    content="Save Changes"
                  />
                  <CustomButton
                    type="button"
                    btnClass="employee-update__button"
                    content="Remove Employee"
                  />
                </div>
              </form>

              {isUpdating ? (
                <div className="dual-ring-loader"></div>
              ) : (
                <div style={{ height: "5rem" }}></div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  employee: selectEmployee,
  isUpdating: selectIsEmployeeUpdating,
});

const mapDispatchToProps = (dispatch) => ({
  updateEmployeeStart: (employeeId, updateBody) =>
    dispatch(updateEmployeeStart(employeeId, updateBody)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeUpdate);
