import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Link } from "react-router-dom";

import "./profile-preview.styles.scss";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { selectCurrentUser } from "../../redux/user/user.selector";
import { updateUserDetailsStart } from "../../redux/user/user.actions";

class ProfilePreview extends React.Component {
  state = {
    name: this.props.currentUser.name,
    email: this.props.currentUser.email,
    photo: this.props.currentUser.photo,
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  photoChange = (event) => {
    this.setState({ photo: event.target.files[0] });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { name, email, photo } = this.state;
    const { updateUserDetailsStart } = this.props;

    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("photo", photo);

    updateUserDetailsStart(formData);
  };

  render() {
    const { currentUser } = this.props;
    return (
      <div className="account-details">
        <h2 className="account-details__heading">YOUR ACCOUNT DETAILS</h2>
        <form className="account-details__form" onSubmit={this.handleSubmit}>
          <div className="account-details__input-group">
            <FormInput
              name="name"
              type="name"
              placeholder={currentUser.name}
              value={this.state.name}
              label="Name"
              handleChange={this.handleChange}
            />

            <FormInput
              name="email"
              type="email"
              placeholder={currentUser.email}
              value={this.state.email}
              label="Email"
              handleChange={this.handleChange}
            />
          </div>

          <div className="account-details__photo-container">
            <img
              src={`/img/user/${currentUser.photo}`}
              className="account-details__photo-container--photo"
            />

            <FormInput
              name="photo"
              type="file"
              handleChange={this.photoChange}
            />
          </div>

          <div className="account-details__button-group">
            <CustomButton
              type="submit"
              btnClass="account-details__button"
              content="Save Changes"
            />
            <Link to="/my-orders" className="link">
              <CustomButton
                content="Your Orders"
                btnClass="account-details__orders-button"
              />
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  updateUserDetailsStart: (formData) =>
    dispatch(updateUserDetailsStart(formData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePreview);
