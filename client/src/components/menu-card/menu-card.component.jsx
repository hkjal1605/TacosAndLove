import React from "react";

import "./menu-card.styles.scss";

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

const MenuCard = ({ menu }) => {
  return (
    <div className="menu-card">
      <img src={`/img/${menu.photo}`} alt="Menu" className="menu-card__photo" />
      <div className="menu-card__icon-container">
        {iconsObject[`${menu.name}`]}
      </div>
      <h3 className="menu-card__title">{menu.name}</h3>
    </div>
  );
};

export default MenuCard;
