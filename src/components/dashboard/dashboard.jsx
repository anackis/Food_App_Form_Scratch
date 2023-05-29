
import React, { useState, useEffect } from 'react';

import { getCardsDb } from '../../utils/firebase/firebase';

import CardMini from '../card-mini/card-mini';

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

  const updateCardData = (cardId, updatedData) => {
    const updatedCards = cards.map((card) => {
      if (card.id === cardId) {
        return {
          ...card,
          ...updatedData
        };
      }
      return card;
    });
    setCards(updatedCards);
  };


  return (
    <section className="dashboard">
      Hello Dashboard
      <div className="dashboard__wrapper">
        {cards.map((card, i) => (
          <CardMini key={i} cardObject={card} updateCardData={updateCardData}/>
        ))}
      </div>
    </section>
  );
};

export default Dashboard;