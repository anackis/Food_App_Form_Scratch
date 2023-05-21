

import logo from "../../assets/Img/icons/logo.png";
import iconsGroup from "../../assets/Img/icons/icons-group1.png";

import SignIn from "../../components/sign-in/sign-in";
import SignUp from "../../components/sign-up/sign-up";

import "./home.scss";

const test = () => {
  return (
    <section className="home">
      <div className="home__wrapper">

        <div className="home__left">
            <div className="home__logo">
              <img className="home__logo-icon" src={logo} alt="fire" />
              <span className="home__logo-logo">Food App</span>
            </div>
            <img className='home__icons' src={iconsGroup} alt="1png" />
            <h1>Welcome to Food App. With us, you can calculate your daily calories norm, watch other people's recipes, create your own recipes, and manage your weekly ration.</h1>
            <br />
            <h2>You are what you eat!</h2>
        </div>
      
        <div className="home__right">
          <div className="home__right_wrapper">
            <SignIn/>
            <SignUp/>
            {/* <SignOut/> */}
          </div>
        </div>
      

      </div>
    </section>
  );
};

export default test;