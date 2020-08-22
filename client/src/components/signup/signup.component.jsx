import React from "react";

import { connect } from "react-redux";

import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";

import { signupUserStart } from "../../redux/user/user.actions";

class SignUp extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { signupUserStart } = this.props;
    const { name, email, password, confirmPassword } = this.state;

    signupUserStart(name, email, password, confirmPassword);

    this.setState({ name: "", email: "", password: "", confirmPassword: "" });
  };
  render() {
    return (
      <div className="login">
        <h3 className="login__heading">Create Your Account</h3>
        <form className="login__form" onSubmit={this.handleSubmit}>
          <FormInput
            name="name"
            type="name"
            value={this.state.name}
            label="Name"
            placeholder=""
            handleChange={this.handleChange}
            required
          />
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
          <FormInput
            name="confirmPassword"
            type="password"
            value={this.state.confirmPassword}
            label="Confirm Password"
            placeholder="••••••••"
            handleChange={this.handleChange}
            required
          />

          <div className="buttons-group">
            <CustomButton type="submit" content="Sign Up" />
          </div>
        </form>
      </div>
    );
  }
}

const mapDsipatchToProps = (dispatch) => ({
  signupUserStart: (name, email, password, confirmPassword) =>
    dispatch(signupUserStart(name, email, password, confirmPassword)),
});

export default connect(null, mapDsipatchToProps)(SignUp);
