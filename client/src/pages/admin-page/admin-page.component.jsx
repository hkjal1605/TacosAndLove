import React from "react";
import { Link } from "react-router-dom";

import "./admin-page.styles.scss";

import AdminWelcome from "../../components/admin-welcome/admin-welcome.component";
import AdminCard from "../../components/admin-card/admin-card.component";

const AdminPage = () => {
  return (
    <div className="admin-page">
      <AdminWelcome />
      <div className="admin-page__cards">
        <Link to="/admin/bookings" className="link">
          <AdminCard type="orders" />
        </Link>
        <Link to="/admin/employees" className="link">
          <AdminCard type="employees" />
        </Link>
        <Link to="/admin/kitchen" className="link">
          <AdminCard type="kitchen" />
        </Link>
      </div>
    </div>
  );
};

export default AdminPage;
