
import React, { useState, useEffect, useMemo } from 'react';
import CardMini from '../card-mini/card-mini';
import { 
  updateLikesDislikes, 
  getCardById, 
  updateFavorites, 
  getCardsDb, 
  deleteCardFromDb 
} from '../../utils/firebase/firebase';

import './dashboard.scss';

const sortFunctions = {
  likes: (a, b) => b.likes - a.likes,
  dislikes: (a, b) => b.dislikes - a.dislikes,
  createdAt: (a, b) => b.createdAt - a.createdAt,
};

const Dashboard = ({userDataDB, context, activeDay, placement}) => {
  const [cards, setCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('createdAt');

  useEffect(() => {
    const fetchCards = async () => {
      const retrievedCards = await getCardsDb();
      retrievedCards.sort(sortFunctions['createdAt']);
      setCards(retrievedCards);
    };

    fetchCards();
  }, []);

  const updateCardsState = async (cardId) => {
    const updatedCard = await getCardById(cardId);
    const updatedCards = cards.map((card) => {
      if (card.firebaseId === cardId) {
        return updatedCard;
      }
      return card;
    });
    setCards(updatedCards);
  }

  const handleLikeDislikeClick = async (cardId, userId, type) => {
    await updateLikesDislikes(cardId, userId, type);
    updateCardsState(cardId);
  };

  const handleFavoriteClick = async (cardId, userId) => {
    await updateFavorites(cardId, userId);
    updateCardsState(cardId);
  };

  const handleSortClick = (type) => {
    setSortOrder(type);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };  

  const filteredCards = useMemo(() => cards.filter(card => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      card.userName.toLowerCase().includes(lowerCaseSearchTerm) ||
      card.id.toLowerCase().includes(lowerCaseSearchTerm) ||
      card.name.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }), [cards, searchTerm]);

  const filteredAndSortedCards = useMemo(() => {
    let result = [...filteredCards];

    if (sortOrder in sortFunctions) {
      result.sort(sortFunctions[sortOrder]);
    } else if (sortOrder === 'likedList') {
      result = result.filter((card) => card.likedList && card.likedList.includes(userDataDB.id));
    } else if (sortOrder === 'dislikedList') {
      result = result.filter((card) => card.dislikedList && card.dislikedList.includes(userDataDB.id));
    } else if (sortOrder === 'foviritedList') {
      result = result.filter((card) => card.favoriteList && card.favoriteList.includes(userDataDB.id));
    } else if (sortOrder === 'createdByMe') {
      result = result.filter((card) => card.userId === userDataDB.id);
    }
    return result;
  }, [filteredCards, sortOrder, userDataDB]);

  const handleDeleteClick = async (cardId) => {
    await deleteCardFromDb(cardId);
    const updatedCards = cards.filter((card) => card.firebaseId !== cardId);
    setCards(updatedCards);
  };


  return (
    <section className="dashboard">

      <div className="dashboard__navbar">
       
        <input
          type="text"
          className='dashboard__navbar__input'
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
        />

        <button 
          onClick={() => handleSortClick('createdAt')}
          className={sortOrder === 'createdAt' ? 
            'dashboard__navbar__button_active dashboard__navbar__button' : 
            'dashboard__navbar__button'}
        >
          Sort by Date
        </button>
        <button 
          onClick={() => handleSortClick('likes')}
          className={sortOrder === 'likes' ? 
            'dashboard__navbar__button_active dashboard__navbar__button' : 
            'dashboard__navbar__button'}
        >
          Sort by Likes
        </button>
        <button 
          onClick={() => handleSortClick('dislikes')}
          className={sortOrder === 'dislikes' ? 
            'dashboard__navbar__button_active dashboard__navbar__button' : 
            'dashboard__navbar__button'}
        >
          Sort by Dislikes
        </button>

        <button 
          onClick={() => handleSortClick('likedList')}
          className={sortOrder === 'likedList' ? 
            'dashboard__navbar__button_active dashboard__navbar__button ml' : 
            'dashboard__navbar__button ml'}
        >
          Liked
        </button>

        <button 
          onClick={() => handleSortClick('dislikedList')}
          className={sortOrder === 'dislikedList' ? 
            'dashboard__navbar__button_active dashboard__navbar__button' : 
            'dashboard__navbar__button'}
        >
          Disliked
        </button>

        <button 
          onClick={() => handleSortClick('foviritedList')}
          className={sortOrder === 'foviritedList' ? 
            'dashboard__navbar__button_active dashboard__navbar__button' : 
            'dashboard__navbar__button'}
        >
          Favorite
        </button>

        <button 
          onClick={() => handleSortClick('userCreated')}
          className={sortOrder === 'userCreated' ? 
            'dashboard__navbar__button_active dashboard__navbar__button ml' : 
            'dashboard__navbar__button ml'}
        >
          Your Recipes
        </button>
      </div>
      
      <div className="dashboard__wrapper">
        {filteredAndSortedCards.map((card, i) => (
          <CardMini 
            key={i} 
            cardObject={card} 
            handleLikeDislikeClick={handleLikeDislikeClick} 
            userDataDB={userDataDB} 
            handleFavoriteClick={handleFavoriteClick}
            context={context}
            activeDay={activeDay}
            handleDeleteClick={handleDeleteClick}
            sortOrder={sortOrder}
          />
        ))}
      </div>
    </section>
  );
};

export default Dashboard;