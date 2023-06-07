

import { useState, useEffect } from "react";
import photo from "../../assets/Img/recipe/photo.png";
import imageCompression from 'browser-image-compression';
import SignOut from "../sign-out/sign-out";
import Dashboard from "../dashboard/dashboard";

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



  const handleImgUploadChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const options = {
        maxSizeMB: 0.5, 
        maxWidthOrHeight: 1920, 
        useWebWorker: true,
      };
      try {
        const compressedFile = await imageCompression(file, options);
        const reader = new FileReader();
        reader.onload = (e) => {
          uploadImg(e.target.result);
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.log(error);
      }
    }
  };

  function formatTimestamp({ seconds, nanoseconds }) {
    const totalMilliseconds = (seconds * 1000) + (nanoseconds / 1000000);
    const date = new Date(totalMilliseconds);
    const formattedDate = date.toLocaleDateString();
    setCreatedAt(formattedDate);
  };

  

  return (
    <div className="user-block">
      <h1 className="user-block__profile">Profile</h1>
      <div className="small-divider"></div>
      <div className="user-block__wrapper">
        
        <div className="user-block__img-and-name">
          <img className="user-block__user-icon" src={userDataDB.userImg} alt="userImg" />
          <div className="user-block__user-icon-right">
            <label htmlFor="inputfile">
              <img className="user-block__user-icon-change" src={photo} alt="chnageIcon" />
              
              <input id="inputfile" type="file" onChange={handleImgUploadChange} accept="image/*" />
            </label>
            {userDataDB.displayName && <h2>{userDataDB.displayName}</h2>}
          </div>
          <SignOut/>
        </div>

        <div className="user-block__wrapper-elem">
          <h3>More Info</h3>
          {userDataDB.balance && <h3>Balance ${userDataDB.balance}</h3>}
          {<div className="user-block__text">Name Surname &nbsp; {userDataDB.displayName}</div>}
          {<div className="user-block__text">Account created &nbsp; {createdAt}</div>}
          <div className="user-block__kcal-block">
            {<div className="user-block__kcal">Your daily calories &nbsp; {userDataDB.kcal}</div>}
            <button 
              className="user-block__kcal_link" 
              onClick={() => {
                handleNavItemClick('Calculator');
              }}>
              Calculate your calories
            </button>
          </div>
          
        </div>
      </div>

      <div className="user-block__dashboard">
        <Dashboard userDataDB={userDataDB}/>
      </div>

    </div>
  );
};

export default Profile;