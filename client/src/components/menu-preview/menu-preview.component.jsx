import React from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectItemList } from "../../redux/menu-items/items.selector";

import "./menu-preview.styles.scss";

import ItemCard from "../item-card/item-card.component";

import { ReactComponent as Taco } from "../../icons/taco.svg";
import { ReactComponent as Burrito } from "../../icons/burrito.svg";
import { ReactComponent as Quesadilla } from "../../icons/quesadilla.svg";
import { ReactComponent as Deserts } from "../../icons/deserts.svg";
import { ReactComponent as Sides } from "../../icons/nachos.svg";
import { ReactComponent as Specialities } from "../../icons/specialities.svg";

const iconsObject = {
  Tacos: <Taco className="menu-card__icon" />,
  Burritos: <Burrito className="menu-card__icon" />,
  Quesadilla: <Quesadilla className="menu-card__icon" />,
  Sides: <Sides className="menu-card__icon" />,
  Deserts: <Deserts className="menu-card__icon" />,
  Specialities: <Specialities className="menu-card__icon" />,
};

const MenuPreview = ({ itemList, menuName }) => {
  return (
    <div className="menu-preview">
      {itemList ? (
        <div className="menu-preview__header">
          <img
            src={`/img/${itemList[0].image}`}
            alt="Menu Item"
            className="menu-preview__header--image"
          />
          <img
            src={`/img/${itemList[1].image}`}
            alt="Menu Item"
            className="menu-preview__header--image"
          />
          <img
            src={`/img/${itemList[2].image}`}
            alt="Menu Item"
            className="menu-preview__header--image"
          />
        </div>
      ) : null}

      <div className="menu-preview__content">
        <div className="menu-preview__icon-container">
          {Object.keys(iconsObject).map((key) =>
            key.toLowerCase() === menuName ? iconsObject[key] : null
          )}
        </div>
        <h2 className="menu-preview__heading">{menuName.toUpperCase()}</h2>

        <div className="menu-preview__container">
          {itemList
            ? itemList.map((item) => (
                <ItemCard key={item._id} item={item} itemName={menuName} />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  itemList: selectItemList,
});

export default connect(mapStateToProps)(MenuPreview);
