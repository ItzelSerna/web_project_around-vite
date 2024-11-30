import React from "react";
import logo from "../../images/logo.png";

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="Around The U.S. logo" className="header__logo" />
    </header>
  );
}

export default Header;
