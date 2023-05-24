

import logo from "../../assets/Img/icons/logo.png";
import like from "../../assets/Img/social/like.png"
import dislike from "../../assets/Img/social/dislike.png"
import favorite from "../../assets/Img/social/favorite-yellow.png"
import favoriteActive from "../../assets/Img/social/favorite-active.png"

import './card.scss';

const Card = (props) => {
  const { cardObject, formDataImg } = props;

  // if (!cardObject || !cardObject.name) {
  //   return null;
  // }
  // console.log(props.cardObject.name);

  // console.log(cardObject);

  return (
    <div className="card">
      <div className="card__wrapper">
        <div className="card__name">{cardObject.name ? cardObject.name : "Name"}</div>
        <div className="card__img">
          <img src={formDataImg ? URL.createObjectURL(formDataImg) : logo} alt="card-img" />
        </div>
        <div className="card__creator">
          <h3>Creator </h3>
        </div>
        <div className="card__social">
          <div className="card__social-likes">
            <button className="card__likes-button"><img src={like} alt="like"/></button>
            {/* <div className="card__likes">Likes{cardObject.likes}</div> */}
          </div>
          <div className="card__social-dislikes">
            <button className="card__likes-button"><img src={dislike} alt="dislike"/></button>
            {/* <div className="card__dislikes">Dislikes{cardObject.dislikes}</div> */}
          </div>
          <div className="card__social-favorite">
            <button className="card__likes-button"><img src={favorite} alt="favorite"/></button>
            {/* <div className="card__favorite">Favorite{cardObject.favorite}</div> */}
          </div>
        </div>
        

        <div className="card__components">
          <h3>Components:</h3>
          {cardObject.components &&
            cardObject.components.map((item, i) => (
              <div key={i}>
                <p>{item.componentName ? item.componentName : "Name"}</p>
                <div className="card__components_component_stats">
                  <p>{item.componentKcalPerG ? item.componentKcalPerG : "Kcal"}</p>
                  <p>{item.componentWeight ? item.componentWeight : "Weight"}</p>
                  <p>{item.componentPricePerG ? item.componentPricePerG : "Price"}</p>
                </div>
              </div>
            ))}
        </div>

        <div className="card__totals">
          <h3>Totals</h3>
          <div className="card__totals_wrapper">
            <div className="card__total-cal card__totals_wrapper-item">Kcal {cardObject.totalKcal}</div>
            <div className="card__total-weight card__totals_wrapper-item">Weight {cardObject.totalWeight}</div>
            <div className="card__total-price card__totals_wrapper-item">Price {cardObject.totalPrice}</div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Card;