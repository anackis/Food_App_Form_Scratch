
import React from "react";
import {Link} from 'react-router-dom';
import umaru from "../../assets/Img/not-found/umaru.jpg";
import "./not-found.scss";


const NotFound = () => {
  return (
    <section className="not-found">
      <div className="not-found__wrapper">
        <div className="not-found__left">
          <img src={umaru} alt="umaru" />
        </div>
        <div className="not-found__right">
          <div className="not-found__text">
            <h1>404</h1>
            <h2>Oh no. Your web page was eaten.</h2>
            <Link className="not-found__link" to="/">Go to homepage</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;