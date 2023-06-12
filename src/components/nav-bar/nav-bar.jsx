
import React, { useState, useEffect } from 'react';
import SignOut from '../sign-out/sign-out';
import logoImg from "../../assets/Img/icons/logo.png";
import dashboardIcon from "../../assets/Img/nav-bar/dashboard.png";
import planIcon from "../../assets/Img/nav-bar/plan.png";
import userIcon from "../../assets/Img/nav-bar/user.png";
import recipeIcon from "../../assets/Img/nav-bar/recipe.png";
import calculatorIcon from "../../assets/Img/nav-bar/calculator.png";
import helpIcon from "../../assets/Img/nav-bar/help.png";
import hamburger from "../../assets/Img/icons/hamburger.png";
import "./nav-bar.scss";


const navItems = [
  { name: 'Dashboard', icon: dashboardIcon  },
  { name: 'Food Plan', icon: planIcon  },
  { name: 'Profile', icon: userIcon  },
  { name: 'Recipe', icon: recipeIcon  },
  { name: 'Calculator', icon: calculatorIcon  },
  { divider: true },
  { name: 'Help Center', icon: helpIcon  },
];


const NavBar = ({activeLink, handleNavItemClick }) => {
  const [hamburgerSwitch, setHamburgerSwitch] = useState(false);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 991) {
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

  const handleHamburgerClick = () => {
    setHamburgerSwitch(!hamburgerSwitch);
  }

 
  return (
    <section className="navbar">

      {/* <div className="navbar__logo navbar__logo_mobile">
        <img className="navbar__logo-fire" src={fire} alt="fire" />
        <span className="navbar__logo-logo">Free Bank</span>
      </div> */}

      <div className="navbar__logo navbar__logo_mobile">
        <img src={logoImg} alt="logo-img" />
        <span className="navbar__logo-logo">Food App</span>
      </div>

      <button className='hamburger' onClick={() => handleHamburgerClick()}>
        <img src={hamburger} alt="hamburger" />
      </button>


      <div className={hamburgerSwitch ? "navbar__wrapper hiden" : "navbar__wrapper"}>
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
                  {item.icon && <img className='navbar__icon' src={item.icon} alt={`${item.name}-icon`} />}
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