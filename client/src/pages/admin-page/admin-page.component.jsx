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
        <AdminCard type="employees" />
        <AdminCard type="kitchen" />
      </div>
    </div>
  );
};

export default AdminPage;
