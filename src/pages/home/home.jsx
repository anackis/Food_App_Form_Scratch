
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import logo from "../../assets/Img/icons/logo.png";
import iconsGroup from "../../assets/Img/icons/compressed.webp";
import SignIn from "../../components/sign-in/sign-in";
import SignUp from "../../components/sign-up/sign-up";
import "./home.scss";


const MemoizedSignIn = React.memo(SignIn);
const MemoizedSignUp = React.memo(SignUp);

const LeftSection = () => (
  <div className="home__left">
    <div className="home__logo">
      <img className="home__logo-icon" src={logo} alt="fire" />
      <span className="home__logo-logo">Food App</span>
    </div>
    <LazyLoadImage
      alt="iconsGroup"
      src={iconsGroup} 
      className='home__icons'
    />
    <h1>Welcome to Food App. With us, you can calculate your daily calories norm, watch other people's recipes, create your own recipes, and manage your weekly ration.</h1>
    <h2>You are what you eat!</h2>
  </div>
);

const RightSection = () => (
  <div className="home__right">
    <div className="home__right_wrapper">
      <MemoizedSignIn/>
      <MemoizedSignUp/>
    </div>
  </div>
);

const HomePage = () => (
  <section className="home">
    <div className="home__wrapper">
      <LeftSection />
      <RightSection />
    </div>
  </section>
);

export default HomePage;