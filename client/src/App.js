import React from "react";
import "./App.css";

import { createStructuredSelector } from "reselect";

import { connect } from "react-redux";

import { selectCurrentUser } from "./redux/user/user.selector";
import { selectCurrentEmployee } from "./redux/employee/employee.selector";

import { Switch, Route, Redirect } from "react-router-dom";

import HomePage from "./pages/home-page/home-page.component";
import MenuPage from "./pages/menu-page/menu-page.component";
import Navigation from "./components/navigation/navigation.component";
import LoginPage from "./pages/login-page/login-page.component";
import EmployeeLoginPage from "./pages/employee-login-page/employee-login-page.component";
import SignupPage from "./pages/signup-page/signup-page.component";
import CheckoutPage from "./pages/checkout-page/checkout-page.component";
import BookingsPage from "./pages/bookings-page/bookings-page.component";
import PasswordResetPage from "./pages/password-reset/password-reset.component";
import ProfilePage from "./pages/profile-page/profile-page.component";
import AdminPage from "./pages/admin-page/admin-page.component";
import adminBookingsPage from "./pages/admin-bookings-page/admin-bookings-page.components";

class App extends React.Component {
  render() {
    const { currentUser, currentEmployee } = this.props;
    return (
      <div className="App">
        <Navigation />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/menu" component={MenuPage} />
          <Route
            exact
            path="/login"
            render={() => (currentUser ? <Redirect to="/" /> : <LoginPage />)}
          />
          <Route
            exact
            path="/employee-login"
            render={() =>
              currentEmployee ? (
                <Redirect to="/admin/main" />
              ) : (
                <EmployeeLoginPage />
              )
            }
          />
          <Route
            exact
            path="/signup"
            render={() => (currentUser ? <Redirect to="/" /> : <SignupPage />)}
          />
          <Route
            exact
            path="/profile"
            render={() => (currentUser ? <ProfilePage /> : <Redirect to="/" />)}
          />
          <Route
            exact
            path="/admin/main"
            render={() =>
              currentEmployee && currentEmployee.role === "owner" ? (
                <AdminPage />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route exact path="/admin/bookings" component={adminBookingsPage} />
          <Route
            exact
            path="/my-orders"
            render={() =>
              currentUser ? <BookingsPage /> : <Redirect to="/" />
            }
          />
          <Route
            exact
            path="/checkout"
            render={() =>
              currentUser ? <CheckoutPage /> : <Redirect to="/" />
            }
          />
          <Route
            exact
            path="/user/forgotPassword"
            render={() =>
              currentUser ? <Redirect to="/" /> : <PasswordResetPage />
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  currentEmployee: selectCurrentEmployee,
});

export default connect(mapStateToProps)(App);
