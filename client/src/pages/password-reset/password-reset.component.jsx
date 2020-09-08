import React from "react";

import "./password-reset.styles.scss";

import PasswordReset from "../../components/password-reset-form/password-reset.component";

class PasswordResetPage extends React.Component {
  render() {
    return (
      <div className="password-reset-page">
        <PasswordReset />
      </div>
    );
  }
}

export default PasswordResetPage;
