import React from "react";

import MenuPreview from "../../components/menu-preview/menu-preview.component";

import "./menu-page.styles.scss";
import { Route } from "react-router-dom";

class MenuPage extends React.Component {
  render() {
    const { match } = this.props;
    return (
      <div className="menu-page">
        <Route path={`${match.path}/tacos`} component={MenuPreview}></Route>
        <Route path={`${match.path}/burritos`} component={MenuPreview}></Route>
        <Route
          path={`${match.path}/quesadilla`}
          component={MenuPreview}
        ></Route>
        <Route path={`${match.path}/sides`} component={MenuPreview}></Route>
        <Route path={`${match.path}/deserts`} component={MenuPreview}></Route>
        <Route
          path={`${match.path}/specialities`}
          component={MenuPreview}
        ></Route>
      </div>
    );
  }
}

export default MenuPage;
