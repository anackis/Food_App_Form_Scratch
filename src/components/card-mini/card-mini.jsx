
import React, { useState, useEffect  } from 'react';

import logo from "../../assets/Img/icons/logo.png";
import like from "../../assets/Img/social/like.png"
import dislike from "../../assets/Img/social/dislike.png"
import favorite from "../../assets/Img/social/favorite-yellow.png"
import favoriteActive from "../../assets/Img/social/favorite-active.png"
import './card-mini.scss';


import { updateCardLikes } from '../../utils/firebase/firebase';
import { updateCardDislikes } from '../../utils/firebase/firebase';



const CardMini = (props) => {
  const { cardObject, updateCardData } = props;
  const [socialStatus, setSocialStatus] = useState({
    likes: cardObject.likes || 0,
    dislikes: cardObject.dislikes || 0
  });



  // console.log(cardObject);

  const handleLike = () => {
    const userId = cardObject.id;
    const likedByUser = socialStatus.likes && cardObject.likesList.includes(cardObject.id);
    
    if (!likedByUser) {
      setSocialStatus({
        ...socialStatus,
        likes: socialStatus.likes + 1
      });
      cardObject.likesList.push(cardObject.id);
      updateCardLikes(cardObject.firebaseId, socialStatus.likes + 1);
      // updateCardData(cardObject.id, { likes: socialStatus.likes + 1 });
    } else {
      setSocialStatus({
        ...socialStatus,
        likes: socialStatus.likes - 1
      });
      cardObject.likesList = cardObject.likesList.filter((id) => id !== userId);
      updateCardLikes(cardObject.firebaseId, socialStatus.likes - 1);
      // updateCardData(cardObject.id, { likes: socialStatus.likes - 1 });
    }
  };

  const handleDislike = () => {
    const userId = cardObject.id;
    const dislikedByUser = socialStatus.dislikes && cardObject.dislikesList.includes(cardObject.id);

    if (!dislikedByUser) {
      setSocialStatus({
        ...socialStatus,
        dislikes: socialStatus.dislikes + 1
      });
      cardObject.dislikesList.push(cardObject.id);
      updateCardDislikes(cardObject.firebaseId, socialStatus.dislikes + 1);
      // updateCardData(cardObject.id, { dislikes: socialStatus.dislikes + 1 });
    } else {
      setSocialStatus({
        ...socialStatus,
        dislikes: socialStatus.dislikes - 1
      });
      cardObject.dislikesList = cardObject.dislikesList.filter((id) => id !== userId);
      updateCardDislikes(cardObject.firebaseId, socialStatus.dislikes - 1);
      // updateCardData(cardObject.id, { dislikes: socialStatus.dislikes - 1 });
    }
  };
  

  return (
    <div className="card-mini">
      <div className="card-mini__wrapper">
        <div className="card-mini__name">{cardObject.name ? cardObject.name : "Name"}</div>
        <div className="card-mini__img">
          <img src={cardObject.image ? cardObject.image : logo} alt="card-mini-img" />
        </div>
        <div className="card-mini__creator">
          {cardObject.userImg ? <img src={cardObject.userImg} alt="userImg" /> : null}
          
          <h3>{cardObject.userName ? cardObject.userName : "Creator"}</h3>
          <h3>#{cardObject.id ? cardObject.id : ""}</h3>
          
        </div>
        <div className="card-mini__social">
          <div className="card-mini__social_left">
            <div className="card-mini__social-likes">
              <button className="card-mini__likes-button" onClick={handleLike}>
                <img src={like} alt="like"/>
              </button>
              <div className="card-mini__social-likes-count">
                {cardObject.likes && cardObject.likes}
              </div>
            </div>
            <div className="card-mini__social-dislikes">
              <button className="card-mini__likes-button" onClick={handleDislike}>
                <img src={dislike} alt="dislike"/>
              </button>
              <div className="card-mini__social-dislikes-count">
               {cardObject.dislikes && cardObject.dislikes}
              </div>
            </div>
          </div>
          <div className="card__social_right">
            <div className="card-mini__social-favorite">
              <button className="card-mini__likes-button">
                <img src={favorite} alt="favorite"/>
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

export default CardMini;