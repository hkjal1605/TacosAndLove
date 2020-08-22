import React from "react";
import "./App.css";

import { createStructuredSelector } from "reselect";

import { connect } from "react-redux";

import { selectCurrentUser } from "./redux/user/user.selector";

import { Switch, Route, Redirect } from "react-router-dom";

import HomePage from "./pages/home-page/home-page.component";
import MenuPage from "./pages/menu-page/menu-page.component";
import Navigation from "./components/navigation/navigation.component";
import LoginPage from "./pages/login-page/login-page.component";
import SignupPage from "./pages/signup-page/signup-page.component";
import CheckoutPage from "./pages/checkout-page/checkout-page.component";

class App extends React.Component {
  render() {
    const { currentUser } = this.props;
    return (
      <div className="App">
        <Navigation />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route
            exact
            path="/login"
            render={() => (currentUser ? <Redirect to="/" /> : <LoginPage />)}
          />
          <Route
            exact
            path="/signup"
            render={() => (currentUser ? <Redirect to="/" /> : <SignupPage />)}
          />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route exact path="/:itemName" component={MenuPage} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(App);
