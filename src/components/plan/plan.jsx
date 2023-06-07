
import React, { useState, useEffect } from 'react';
import CardMini from '../card-mini/card-mini';
import Dashboard from '../dashboard/dashboard';
import { db } from '../../utils/firebase/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

import './plan.scss';

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];


const Plan = ({userDataDB}) => {
  const { diet } = userDataDB;
  
  const [activeDay, setActiveDay] = useState('Monday');
  // const [cards, setCards] = useState([]);

  const [totalCaloriesOnDay, setTotalCaloriesOnDay] = useState({
    "Monday": 0,
    "Tuesday": 0,
    "Wednesday": 0,
    "Thursday": 0,
    "Friday": 0,
    "Saturday": 0,
    "Sunday": 0
  });

  const handleClick = (day) => {
    setActiveDay(day);
  };
 

  // useEffect(() => {
  //   const fetchCards = async () => {
  //     const retrievedCards = await getCardsDb();
  //     retrievedCards.sort((a, b) => b.createdAt - a.createdAt);
  //     setCards(retrievedCards);
  //   };
  
  //   fetchCards();
  // }, []);


  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
  
    if(!currentUser) {
      // console.log("No user currently signed in.");
      return;
    }
  
    const userId = currentUser.uid;
    const dietRef = doc(db, 'users', userId);
    const unsubscribe = onSnapshot(dietRef, (docSnap) => {
      if (docSnap.exists()) {
        const updatedDiet = docSnap.data().diet;
  
        if (updatedDiet) {
          calculateTotalCalories(updatedDiet);
        }
      } else {
        console.log("No such document!");
      }
    });
  
  
    return () => unsubscribe();
  }, [userDataDB]);

  const activeDayMeals = diet?.find(dayMeals => dayMeals.day === activeDay)?.meals || [];

  const activeDayMealComponents = activeDayMeals.map((meal, index) => (
    <CardMini 
      key={index} 
      cardObject={meal} 
      userDataDB={userDataDB} 
      activeDay={activeDay}
      context="context2"
    />
  ));


  const calculateTotalCalories = (dietData) => {
    let calories = {
      "Monday": 0,
      "Tuesday": 0,
      "Wednesday": 0,
      "Thursday": 0,
      "Friday": 0,
      "Saturday": 0,
      "Sunday": 0
    };
  
    dietData.forEach(dayMeals => {
      const day = dayMeals.day;
      // console.log(dayMeals.meals);
      const meals = dayMeals.meals || [];
      const dayCalories = meals.reduce((total, meal) => total + meal.totalKcal, 0);
      calories[day] = dayCalories;
    });
  
    setTotalCaloriesOnDay(calories);
  };

return (
    <section className="plan">

      <div className="plan__header">
        {daysOfWeek.map((day, index) => (
          <div
            key={index}
            className={`plan__header__item ${day === activeDay ? "plan__header__item_active" : ""}`}
            onClick={() => handleClick(day)}
          >
            <div className="plan__header__item-title">{day}</div>
            <div className="plan__header__item-dailynorm">Daily norm</div>
            <div className="plan__header__item-fill">{totalCaloriesOnDay[day]} / {userDataDB.kcal ? userDataDB.kcal : "-"}</div>
          </div>
        ))}
      </div>

      <div className="plan__item-content">
        <div className="plan__item-content__wrapper">
          {activeDayMealComponents}
        </div>
      </div>

      <Dashboard userDataDB={userDataDB} context="context1" activeDay={activeDay}/>

    </section>
  );
};

export default Plan;
