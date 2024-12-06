import type React from "react";
import "../styles/Header.css";
import logo from "../assets/images/logo 1.svg";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Helpi Logo" className="logo" />
      </div>
      <div className="content">
        <div className="text-container">
          <h1>Unissons nos forces </h1>
          <p>
            Découvrez, soutenez et agissez aux côtés des associations qui
            changent le monde. <br />
            Un projet à la fois.
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
