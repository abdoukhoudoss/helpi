import React from "react";
import "../styles/Header.css";
import logo from "../assets/images/logo-helpi.png";
import icon from "../assets/images/header-image.png";


const Header: React.FC = () => {
  return (
    <header className="header">
     
      <div className="logo-container">
        <img src={logo} alt="Helpi Logo" className="logo" />
        <h2>HELPI</h2>
      </div>

      <div className="content">
        <div className="text-container">
          <h1>Unissons nos forces :</h1>
          <h2>
            Découvrez, soutenez et agissez aux côtés des associations qui changent
            le monde. <br />
            Un projet à la fois.
          </h2>
        </div>
      </div>
    </header>
  );
};

export default Header;
