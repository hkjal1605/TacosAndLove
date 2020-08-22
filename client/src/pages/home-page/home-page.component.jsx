import React from "react";

import { connect } from "react-redux";

import { createStructuredSelector } from "reselect";

import "./home-page.styles.scss";

import Header from "../../components/header/header.component";
import MenuDisplay from "../../components/menu-display/menu-display.component";

import { fetchMenuStart } from "../../redux/menu/menu.actions";
import { selectIsMenuListFetching } from "../../redux/menu/menu.selector";

import WithSpinner from "../../components/with-spinner/with-spinner.component";

const MenuDisplayWithSpinner = WithSpinner(MenuDisplay);

class HomePage extends React.Component {
  componentDidMount() {
    const { fetchMenuStart } = this.props;
    fetchMenuStart();
  }
  render() {
    const { isMenuLoading } = this.props;
    return (
      <div className="home-page">
        <Header />
        <MenuDisplayWithSpinner isLoading={isMenuLoading} />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isMenuLoading: selectIsMenuListFetching,
});

const mapDispatchToProps = (dispatch) => ({
  fetchMenuStart: () => dispatch(fetchMenuStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
