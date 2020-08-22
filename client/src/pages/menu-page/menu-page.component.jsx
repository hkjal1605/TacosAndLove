import React from "react";

import { connect } from "react-redux";

import { fetchItemStartAsync } from "../../redux/menu-items/items.actions";
import { selectIsItemListFetching } from "../../redux/menu-items/items.selector";

import MenuPreview from "../../components/menu-preview/menu-preview.component";
import WithSpinner from "../../components/with-spinner/with-spinner.component";

import "./menu-page.styles.scss";
import { createStructuredSelector } from "reselect";

const MenuPreviewWithSpinner = WithSpinner(MenuPreview);

class MenuPage extends React.Component {
  componentDidMount() {
    const { fetchItemStartAsync, match } = this.props;

    fetchItemStartAsync(match.params.itemName);
  }
  render() {
    const { isItemLoading, match } = this.props;
    return (
      <div className="menu-page">
        <MenuPreviewWithSpinner
          isLoading={isItemLoading}
          menuName={match.params.itemName}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isItemLoading: selectIsItemListFetching,
});

const mapDispatchToProps = (dispatch) => ({
  fetchItemStartAsync: (itemName) => dispatch(fetchItemStartAsync(itemName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuPage);
