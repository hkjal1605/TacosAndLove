import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./admin-kitchen.styles.scss";

import { selectMenuList } from "../../redux/menu/menu.selector";

const AdminKitchen = ({ menu }) => {
  return (
    <div className="admin-kitchen">
      {menu ? (
        <div className="admin-kitchen__menu-list">
          {menu.map((menu) => (
            <div className="admin-kitchen__menu-item" key={menu._id}>
              <img
                src={`/img/${menu.photo}`}
                alt="Menu"
                className="admin-kitchen__menu-item--image"
              />
              <h4 className="admin-kitchen__menu-item--name">{menu.name}</h4>
              <h4 className="admin-kitchen__menu-item--quantity">
                {menu.items} Items
              </h4>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  menu: selectMenuList,
});

export default connect(mapStateToProps)(AdminKitchen);
