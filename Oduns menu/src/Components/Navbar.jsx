import React from 'react';
import "../style/Navbar.css";
import logo from "../assets/logo_orange.png";
import { BsBasket2 } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";

const Navbar = () => {
  return (
    <div className='navbar'>
      <img src={logo} alt="Logo" className='logo' />

      <div className="navbar-right">
        <CiSearch className="icon-search" />

        <div className="navbar-cart">
          <BsBasket2 className="icon-basket" />
          <div className="dot"></div>
        </div>

        <button className="sign-in-btn">Sign In</button>
      </div>
    </div>
  );
};

export default Navbar;
