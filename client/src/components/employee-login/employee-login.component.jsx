import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { loginEmployeeStart } from "../../redux/employee/employee.actions";

import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";

class EmployeeLogin extends React.Component {
  state = {
    employeeId: "",
    password: "",
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { loginEmployeeStart } = this.props;
    const { employeeId, password } = this.state;

    loginEmployeeStart(employeeId, password);

    this.setState({ employeeId: "", password: "" });
  };

  render() {
    return (
      <div className="login">
        <h3 className="login__heading">Log Into Your Account</h3>
        <span className="login__info">(For Employees Only)</span>
        <form className="login__form" onSubmit={this.handleSubmit}>
          <FormInput
            name="employeeId"
            type="text"
            value={this.state.employeeId}
            label="Employee ID"
            placeholder="Your-Employee-Id"
            handleChange={this.handleChange}
            required
          />

          <FormInput
            name="password"
            type="password"
            value={this.state.password}
            label="Password"
            placeholder="••••••••"
            handleChange={this.handleChange}
            required
          />

          <div className="buttons-group">
            <CustomButton type="submit" content="LOG IN" />
          </div>
        </form>
        <Link to="/user/forgotPassword">
          <h5 className="login__forgot-pass">Forgot Password?</h5>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginEmployeeStart: (employeeId, password) =>
    dispatch(loginEmployeeStart(employeeId, password)),
});

export default connect(null, mapDispatchToProps)(EmployeeLogin);
