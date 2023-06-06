import React, { useState, useEffect } from 'react';

import SignOut from '../sign-out/sign-out';

import logoImg from "../../assets/Img/icons/logo.png";

import "./nav-bar.scss";

const NavBar = ({activeLink, handleNavItemClick }) => {
  const [hamburgerSwitch, setHamburgerSwitch] = useState(false);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 1250) {
        setHamburgerSwitch(false);
      } else {
        setHamburgerSwitch(true);
      }
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  useEffect(() => {
    localStorage.setItem("activeLink", activeLink);
  }, [activeLink]);

  const navItems = [
    { name: 'Dashboard'},
    { name: 'Food Plan' },
    { name: 'Profile' },
    { name: 'Recipe'},
    { name: 'Calculator' },
    { divider: true },
    { name: 'Help Center' },
  ];

  return (
    <section className="navbar">
      <div className="navbar__logo navbar__logo_mobile">
        <img src={logoImg} alt="logo-img" />
        <span className="navbar__logo-logo">Food App</span>
      </div>
      <button className='hamburger' />
      <div className="navbar__wrapper">
        <div className="navbar__logo-wrapper">
          <img src={logoImg} alt="logo-img" />
          <div className="navbar__logo">
        </div>
          <span className="navbar__logo-logo">Food App</span>
        </div>
        <div className="navbar__nav">
          {navItems.map((item, index) => (
            <React.Fragment key={index}>
              {item.divider ? (
                <div className="navbar__divider"></div>
              ) : (
                <div
                  className={`navbar__item ${activeLink === item.name ? 'navbar__item-active' : ''}`}
                  onClick={() => handleNavItemClick(item.name)}
                >
                  <span>{item.name}</span>
                </div>
              )}
            </React.Fragment>
          ))}
          <SignOut/>
        </div>
      </div>
    </section>
  );
};

export default NavBar;