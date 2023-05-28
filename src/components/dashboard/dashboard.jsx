
import React, { useState, useEffect } from 'react';

import { getCardsDb } from '../../utils/firebase/firebase';

import Card from '../card/card';

import './dashboard.scss';

const Dashboard = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      const retrievedCards = await getCardsDb();
      setCards(retrievedCards);
    };
  
    fetchCards();
  }, []);

  // console.log(cards);


  return (
    <>
      Hello Dashboard
      {cards.map((card, i) => (
      <div key={i}>
        {/* Render card information */}
        {/* <h2>{card.name}</h2>
        <p>{card.userName}</p> */}
        {/* Add more card fields as needed */}
        {/* <Card card={card}/> */}
      </div>
    ))}
    </>
  );
};

export default Dashboard;