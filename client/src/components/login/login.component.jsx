import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import "./login.styles.scss";

import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";

import { loginUserStart } from "../../redux/user/user.actions";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { loginUserStart } = this.props;
    const { email, password } = this.state;

    loginUserStart(email, password);

    this.setState({ email: "", password: "" });
  };
  render() {
    return (
      <div className="login">
        <h3 className="login__heading">Log Into Your Account</h3>
        <form className="login__form" onSubmit={this.handleSubmit}>
          <FormInput
            name="email"
            type="email"
            value={this.state.email}
            label="Email"
            placeholder="you@example.com"
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

const mapDsipatchToProps = (dispatch) => ({
  loginUserStart: (email, password) =>
    dispatch(loginUserStart(email, password)),
});

export default connect(null, mapDsipatchToProps)(Login);
