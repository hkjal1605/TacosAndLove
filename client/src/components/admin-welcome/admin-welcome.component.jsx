import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./admin-welcome.styles.scss";

import { selectCurrentEmployee } from "../../redux/employee/employee.selector";

const AdminWelcome = ({ employee }) => {
  return (
    <div className="admin-welcome">
      <img
        src={`/img/user/${employee.photo}`}
        alt="Hello"
        className="admin-welcome__photo"
      />
      <h2 className="admin-welcome__name">
        Welcome <br /> {employee.name}
      </h2>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  employee: selectCurrentEmployee,
});

export default connect(mapStateToProps)(AdminWelcome);
