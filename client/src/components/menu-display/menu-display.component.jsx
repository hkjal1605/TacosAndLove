import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { Link } from "react-router-dom";

import { selectMenuList } from "../../redux/menu/menu.selector";

import "./menu-display.styles.scss";

import { ReactComponent as Menu } from "../../icons/order.svg";

import MenuCard from "../../components/menu-card/menu-card.component";

const MenuDisplay = ({ menuList }) => {
  return (
    <div className="menu-display">
      <div className="menu-display__icon-container">
        <Menu className="menu-display__icon" />
      </div>
      <h2 className="menu-display__heading">OUR MENU</h2>
      <div className="menu-display__card-container">
        {menuList
          ? menuList.map((menu) => (
              <Link
                key={menu._id}
                to={`/${menu.name.toLowerCase()}`}
                className="link"
              >
                <MenuCard menu={menu} />
              </Link>
            ))
          : null}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  menuList: selectMenuList,
});

export default connect(mapStateToProps)(MenuDisplay);
