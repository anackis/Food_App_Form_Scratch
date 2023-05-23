
import { useState, useEffect } from "react";

import SignOut from "../sign-out/sign-out";

import './profile.scss';

const Profile = ({userDataDB, uploadImg, handleNavItemClick, activeLink}) => {

  const [createdAt, setCreatedAt] = useState();


  useEffect(() => {
    if (userDataDB) {
      if (userDataDB.createdAt) {
        formatTimestamp(userDataDB.createdAt);
      } 
    }
  }, [userDataDB]);


  const handleImgUploadChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        uploadImg(e.target.result);
      }
      reader.readAsDataURL(file);
    }
  }

  function formatTimestamp({ seconds, nanoseconds }) {
    const totalMilliseconds = (seconds * 1000) + (nanoseconds / 1000000);
    const date = new Date(totalMilliseconds);
    const formattedDate = date.toLocaleDateString();
    setCreatedAt(formattedDate);
  };

  

  return (
    // <section className="profile">

    //   <h2 className="title">Profile</h2>
    //   <div className="small-divider"></div>

    // </section>

    <div className="user-block">
      <h2 className="user-block__profile">Profile</h2>
      
      <div className="user-block__img-and-name">
        <img className="user-block__user-icon" src={userDataDB.userImg} alt="userImg" />
        <div className="user-block__user-icon-right">
        {userDataDB.displayName && <h2>{userDataDB.displayName}</h2>}
          <label htmlFor="inputfile">
            {/* <img className="user-block__user-icon-change" src={chnageIcon} alt="chnageIcon" /> */}
            chnageIcon
            <input id="inputfile" type="file" onChange={handleImgUploadChange} accept="image/*" />
          </label>
          
        </div>
        <SignOut/>
      </div>

      <div className="user-block__wrapper">
        {userDataDB.balance && <h3>Balance ${userDataDB.balance}</h3>}
        {<div className="user-block__text">Name Surname : {userDataDB.displayName}</div>}
        {<div className="user-block__text">Account created : {createdAt}</div>}
        <br />
        {<div className="user-block__kcal">Your daily calories : {userDataDB.kcal}</div>}
        <button 
          className="user-block__kcal_link" 
          onClick={() => {
            handleNavItemClick('Calculator');
          }}>
          Calculate your calories
        </button>
      </div>
      
    </div>
  );
};

export default Profile;