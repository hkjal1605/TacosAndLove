import React from "react";
import { connect } from "react-redux";

import { createStructuredSelector } from "reselect";

import "./password-reset.styles.scss";

import {
  forgotPasswordStart,
  resetPasswordStart,
  cancelResetPasswordProcess,
} from "../../redux/user/user.actions";
import {
  selectIsPasswordResetMailSent,
  selectShowLoader,
} from "../../redux/user/user.selector";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

class PasswordReset extends React.Component {
  state = {
    email: "",
    token: "",
    password: "",
    confirmPassword: "",
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { forgotPasswordStart } = this.props;
    const { email } = this.state;

    forgotPasswordStart(email);

    this.setState({ email: "" });
  };

  handleSubmit2 = (event) => {
    event.preventDefault();

    const { resetPasswordStart } = this.props;
    const { token, password, confirmPassword } = this.state;

    resetPasswordStart(token, password, confirmPassword);

    this.setState({ token: "", password: "", confirmPassword: "" });
  };

  cancelProcess = () => {
    const { cancelResetPasswordProcess } = this.props;

    cancelResetPasswordProcess();
  };

  render() {
    const { mailSent, showLoader } = this.props;
    return (
      <div className="login">
        {mailSent ? (
          <div>
            <h3 className="login__heading">Enter the details here</h3>
            <form
              className="password-reset-form____form"
              onSubmit={this.handleSubmit2}
            >
              <FormInput
                name="token"
                type="text"
                value={this.state.token}
                label="Token"
                placeholder="Reset Token"
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
                <CustomButton type="submit" content="Submit Email" />
              </div>
            </form>
            <h3 className="password-reset-form__info">
              Copy the password reset token which you have recieved on your
              email and paste it in the token field
            </h3>
          </div>
        ) : (
          <div>
            <h3 className="login__heading">Enter your email here</h3>
            <form
              className="password-reset-form____form"
              onSubmit={this.handleSubmit}
            >
              <FormInput
                name="email"
                type="email"
                value={this.state.email}
                label="Email"
                placeholder="you@example.com"
                handleChange={this.handleChange}
                required
              />

              <div className="buttons-group">
                <CustomButton
                  type="submit"
                  btnClass="login__button"
                  content="Submit Email"
                />
              </div>
            </form>
          </div>
        )}
        <div className="buttons-group" onClick={this.cancelProcess}>
          <h3 className="cancel-process">Cancel Process</h3>
          {showLoader ? <div class="loader1"></div> : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  mailSent: selectIsPasswordResetMailSent,
  showLoader: selectShowLoader,
});

const mapDispatchToProps = (dispatch) => ({
  forgotPasswordStart: (email) => dispatch(forgotPasswordStart(email)),
  resetPasswordStart: (token, password, confirmPassword) =>
    dispatch(resetPasswordStart(token, password, confirmPassword)),
  cancelResetPasswordProcess: () => dispatch(cancelResetPasswordProcess()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PasswordReset);
