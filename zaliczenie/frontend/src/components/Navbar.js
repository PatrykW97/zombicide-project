import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ logo1, getCharacterData, getZombieData }) => {
  return (
    <div className="main_nav">
      <div className="button_container">
        <Link to="/">
          <div className="logo">
            <img className="logoimg" alt="" src={logo1} />
          </div>
        </Link>
        <Link to="/characters" onClick={getCharacterData}>
          <button type="button" className="menu_btn">
            Pokaż postacie
          </button>
        </Link>
        <Link to="/addcharacter">
          <button type="button" className="menu_btn">
            Dodaj postać
          </button>
        </Link>
        <Link to="/zombie" onClick={getZombieData}>
          <button type="button" className="menu_btn">
            Pokaż Zombie
          </button>
        </Link>
        <Link to="/addzombie">
          <button type="button" className="menu_btn">
            Dodaj Zombie
          </button>
        </Link>
        <div className="login-btn">
        <Link to="/login">
          <button type="button" className="menu_btn2">
            Zaloguj
          </button>
        </Link>
        <Link to="/register">
          <button type="button" className="menu_btn2">
            Zarejestruj
          </button>
        </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
