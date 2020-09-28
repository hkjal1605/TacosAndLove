import React, { lazy, Suspense } from "react";
import "./App.css";

import { createStructuredSelector } from "reselect";

import { connect } from "react-redux";

import { selectCurrentUser } from "./redux/user/user.selector";
import { selectCurrentEmployee } from "./redux/employee/employee.selector";

import { Switch, Route, Redirect } from "react-router-dom";

import Spinner from "./components/spinner/spinner.component";

import ErrorBoundary from "./components/error-boundary/error-boundary.component";

import Navigation from "./components/navigation/navigation.component";
const HomePage = lazy(() => import("./pages/home-page/home-page.component"));
const MenuPage = lazy(() => import("./pages/menu-page/menu-page.component"));

const LoginPage = lazy(() => import("./pages/login-page/login-page.component"));
const EmployeeLoginPage = lazy(() =>
  import("./pages/employee-login-page/employee-login-page.component")
);
const SignupPage = lazy(() =>
  import("./pages/signup-page/signup-page.component")
);
const CheckoutPage = lazy(() =>
  import("./pages/checkout-page/checkout-page.component")
);
const BookingsPage = lazy(() =>
  import("./pages/bookings-page/bookings-page.component")
);
const PasswordResetPage = lazy(() =>
  import("./pages/password-reset/password-reset.component")
);
const ProfilePage = lazy(() =>
  import("./pages/profile-page/profile-page.component")
);
const AdminPage = lazy(() => import("./pages/admin-page/admin-page.component"));
const AdminBookingsPage = lazy(() =>
  import("./pages/admin-bookings-page/admin-bookings-page.components")
);
const AdminEmployeePage = lazy(() =>
  import("./pages/admin-employee-page/admin-employee-page.component")
);
const EmployeeUpdatePage = lazy(() =>
  import("./pages/employee-update-page/employee-update-page.component")
);
const AdminKitchenPage = lazy(() =>
  import("./pages/admin-kitchen-page/admin-kitchen-page.component")
);

class App extends React.Component {
  render() {
    const { currentUser, currentEmployee } = this.props;
    return (
      <div className="App">
        <Navigation />
        <Switch>
          <ErrorBoundary>
            <Suspense fallback={<Spinner />}>
              <Route exact path="/" component={HomePage} />
              <Route path="/menu" component={MenuPage} />
              <Route
                exact
                path="/login"
                render={() =>
                  currentUser ? <Redirect to="/" /> : <LoginPage />
                }
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
                render={() =>
                  currentUser ? <Redirect to="/" /> : <SignupPage />
                }
              />
              <Route
                exact
                path="/profile"
                render={() =>
                  currentUser ? <ProfilePage /> : <Redirect to="/" />
                }
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
              <Route
                exact
                path="/admin/bookings"
                render={() =>
                  currentEmployee && currentEmployee.role === "owner" ? (
                    <AdminBookingsPage />
                  ) : (
                    <Redirect to="/" />
                  )
                }
              />
              <Route
                exact
                path="/admin/employees"
                render={() =>
                  currentEmployee && currentEmployee.role === "owner" ? (
                    <AdminEmployeePage />
                  ) : (
                    <Redirect to="/" />
                  )
                }
              />
              <Route
                exact
                path="/admin/kitchen"
                render={() =>
                  currentEmployee && currentEmployee.role === "owner" ? (
                    <AdminKitchenPage />
                  ) : (
                    <Redirect to="/" />
                  )
                }
              />
              <Route
                exact
                path="/admin/employees/update/:employeeId"
                component={EmployeeUpdatePage}
              />
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
            </Suspense>
          </ErrorBoundary>
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
