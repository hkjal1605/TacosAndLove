import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./admin-employees.styles.scss";

import { selectAllEmployees } from "../../redux/admin/admin.selectors";

const AdminEmployees = ({ employees }) => {
  return (
    <div className="admin-employees">
      {employees && employees.shift()
        ? employees.map((employee) => (
            <div className="admin-employees__card" key={employee._id}>
              <img
                className="admin-employees__card--image"
                src={`/img/user/${employee.photo}`}
                alt="Employee"
              />
              <h3 className="admin-employees__card--name">{employee.name}</h3>
              <h4 className="admin-employees__card--email">
                Email: {employee.email}
              </h4>
              <h4 className="admin-employees__card--role">
                Role: {employee.role}
              </h4>
              <h4 className="admin-employees__card--salary">
                Salary: &#8377;{employee.salary}
              </h4>
              <Link
                to={`/admin/employees/update/${employee._id}`}
                className="link"
              >
                <h4 className="admin-employees__card--update-btn">
                  Update Employee Details
                </h4>
              </Link>
            </div>
          ))
        : null}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  employees: selectAllEmployees,
});

export default connect(mapStateToProps)(AdminEmployees);
