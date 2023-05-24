
import { useState, useEffect, useCallback  } from "react";
import { auth, getDb, updateDb, db } from "../../utils/firebase/firebase";

import {
  collection,
  where,
  query,
  getDocs, 
  onSnapshot
} from 'firebase/firestore';

import NavBar from "../../components/nav-bar/nav-bar";
import Dashboard from "../../components/dashboard/dashboard";
import Profile from "../../components/profile/profile";
import Recipe from "../../components/recipe/recipe";
import Calculator from "../../components/calculator/calculator";
import Coming from "../../components/coming/coming";

import './main.scss';



const Main = () => {
  const [activeLink, setActiveLink] = useState(() => {
    const storedActiveLink = localStorage.getItem("activeLink");
    return storedActiveLink || "Dashboard";
  });
  const [userUid, setUserUid] = useState("");
  const [userDataDB, setUserDataDB] = useState({});
  const [allUsersInfo, setAllUsersInfo] = useState([]); 
  

  useEffect(() => {
    const unsubscribeCheck = auth.onAuthStateChanged(user => {
      if (user) {
        const unsubscribeUsers = getAllUsersRealTime(); 
        setUserUid(user.uid);
        getDb(user.uid)
          .then((response) => setUserDataDB(response))
          .catch((error) => console.error('Error fetching data:', error));
        
        return () => {
          unsubscribeCheck();
          unsubscribeUsers();
        };
      } else {
        // console.log(" User is signed out");
      }
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("activeLink", activeLink);
  }, [activeLink]);

  const getAllUsersRealTime = useCallback(() => {
    const usersCollection = collection(db, 'users');
    const unsubscribe = onSnapshot(usersCollection, (snapshot) => {
      const usersData = [];
      snapshot.forEach((doc) => {
        usersData.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      setAllUsersInfo(usersData);
    });
  
    return unsubscribe; 
  }, []);


  // Functional for Navbar
  const handleNavItemClick = useCallback((linkName) => {
    setActiveLink(linkName);
  }, []);

  // Functionl for User Block
  const uploadImg = useCallback(async (imgURL) => {
    await updateDb(userUid, { userImg: imgURL });
    getDb(userUid).then(data => setUserDataDB(data));
  }, [userUid]);


  let activeComponent;
  if (activeLink === 'Dashboard') {
    activeComponent = <Dashboard/>
  } else if (activeLink === 'Profile') { 
    activeComponent = 
    <Profile 
      userDataDB = {userDataDB}
      uploadImg = {uploadImg}
      handleNavItemClick={handleNavItemClick}
      activeLink={activeLink}
    />;
  } else if (activeLink === 'Calculator') {
    activeComponent = <Calculator />;
  }else if (activeLink === 'Recipe') {
    activeComponent = <Recipe />;
  } else if (activeLink !== 'Dashboard') {
    activeComponent = <Coming />;
  } 



  return (
    <section className="main">
      <div className="main__container">
        <NavBar handleNavItemClick={handleNavItemClick} activeLink={activeLink}/>
        <div className="main__wrapper">
          {activeComponent}
        </div>
      </div>
    </section>
  );
};

export default Main;