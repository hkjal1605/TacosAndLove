import React from "react";

import "./header.styles.scss";

const Header = () => {
  return (
    <main className="header">
      <div className="header__content">
        <div className="header__logo-container">
          <img
            src="/img/logo512.png"
            alt="header-logo"
            className="header__logo"
          />
        </div>
        <h1 className="header__company-name">Tacos & Love</h1>
      </div>
    </main>
  );
};

export default Header;
