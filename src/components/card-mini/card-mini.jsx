
import React, { memo } from 'react';
import { updateDbPlan, deleteMealFromDbPlan } from '../../utils/firebase/firebase';
import { getAuth } from "firebase/auth";

import logo from "../../assets/Img/icons/logo.png";
import like from "../../assets/Img/social/like.png"
import dislike from "../../assets/Img/social/dislike.png"
import favorite from "../../assets/Img/social/favorite-yellow.png"
import favoriteActive from "../../assets/Img/social/favorite-active.png"
import addButton from "../../assets/Img/recipe/add.png";
import removeButton from "../../assets/Img/recipe/remove.png";

import './card-mini.scss';


const CardMini = (props) => {
  const { 
    cardObject, 
    userDataDB, 
    handleLikeDislikeClick, 
    handleFavoriteClick, 
    activeDay,
    context,
    handleDeleteClick,
    sortOrder
  } = props;
  
  const isFavorite = cardObject.favoriteList && cardObject.favoriteList.includes(userDataDB.id);

  const buttonsDisabled = context === 'context2';

  const addMealToPlan = async () => {
    const auth = getAuth();
    const userId = auth.currentUser.uid;
    await updateDbPlan(userId, activeDay, cardObject); 
  };

  const deleteMealFromPlan = async () => {
    const auth = getAuth();
    const userId = auth.currentUser.uid;
    await deleteMealFromDbPlan(userId, activeDay, cardObject);
  };
  
  const renderButtons = () => {
    if (context === 'context1') {
      return (
        <>
          <button className='card-mini__plan-button' onClick={addMealToPlan}>
            <img src={addButton} alt="addButton" />
          </button>
        </>
      );
    } else if (context === 'context2') {
      return (
        <>
          <button className='card-mini__plan-button' onClick={deleteMealFromPlan}>
            <img src={removeButton} alt="removeButton" />
          </button>
        </>
      )
    } else {
      return null; 
    }
  };

  return (
    <div className="card-mini">
      <div className="card-mini__wrapper">

      {renderButtons()}

      { sortOrder === "userCreated" && (
        <button className="card-mini__deleteButton" onClick={() => handleDeleteClick(cardObject.firebaseId)}>
          <img src={removeButton} alt="removeButton" />
        </button>
      )}

      <div className="card-mini__name">{cardObject.name ? cardObject.name : "Name"}</div>
      <div className="card-mini__img">
        <img src={cardObject.image ? cardObject.image : logo} alt="card-mini-img" />
      </div>
      <div className="card-mini__creator">
        {cardObject.userImg ? <img src={cardObject.userImg} alt="userImg" /> : null}
        
        <h3>{cardObject.userName ? cardObject.userName : "Creator"}</h3>
        <h3>{cardObject.id ? cardObject.id : ""}</h3>
        
      </div>
      <div className="card-mini__social">
        <div className="card-mini__social_left">
          <div className="card-mini__social-likes">
            <button className="card-mini__likes-button" onClick={buttonsDisabled ? null : () => handleLikeDislikeClick(cardObject.firebaseId, userDataDB.id, 'like')}>
              <img src={like} alt="like"/>
            </button>
            <div className="card-mini__social-likes-count">
              {cardObject.likes && cardObject.likes}
            </div>
          </div>
          <div className="card-mini__social-dislikes">
            <button className="card-mini__likes-button" onClick={buttonsDisabled ? null :() => handleLikeDislikeClick(cardObject.firebaseId, userDataDB.id, 'dislike')}>
              <img src={dislike} alt="dislike"/>
            </button>
            <div className="card-mini__social-dislikes-count">
              {cardObject.dislikes && cardObject.dislikes}
            </div>
          </div>
        </div>
        <div className="card__social_right">
          <div className="card-mini__social-favorite">
            <button className="card-mini__likes-button" onClick={buttonsDisabled ? null :() => handleFavoriteClick(cardObject.firebaseId, userDataDB.id)}>
              <img src={isFavorite ? favoriteActive : favorite} alt="favorite"/>
            </button>
          </div>
        </div>
      </div>
      

      <div className="card-mini__components">
        <h3>Components:</h3>
        {cardObject.components &&
          cardObject.components.map((item, i) => (
            <div key={i}>
              <p>Name: {item.componentName && item.componentName}</p>
              <div className="card-mini__components_component_stats">
                <p>Kcal {item.componentKcalPerG ? item.componentKcalPerG : "-"}</p>
                <p>Weight {item.componentWeight ? item.componentWeight : "-"}</p>
                <p>Price {item.componentPricePerG ? item.componentPricePerG : "-"}</p>
              </div>
              <div className="card-mini__component__divider"></div>
            </div>
          ))}
      </div>

      <div className="card-mini__totals">
        <h3>Totals</h3>
        <div className="card-mini__totals_wrapper">
          <div className="card-mini__total-cal card-mini__totals_wrapper-item">Kcal {cardObject.totalKcal ? cardObject.totalKcal : "-"}</div>
          <div className="card-mini__total-weight card-mini__totals_wrapper-item">Weight {cardObject.totalWeight ? cardObject.totalWeight : "-"}</div>
          <div className="card-mini__total-price card-mini__totals_wrapper-item">Price {cardObject.totalPrice ? cardObject.totalPrice : "-"}</div>
        </div>
      </div>
        
    </div>
  </div>
  );
};

export default memo(CardMini);