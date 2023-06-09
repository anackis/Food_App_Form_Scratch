
import logo from "../../assets/Img/icons/logo.png";
import like from "../../assets/Img/social/like.png"
import dislike from "../../assets/Img/social/dislike.png"
import favorite from "../../assets/Img/social/favorite-yellow.png"

import './card.scss';

const Card = (props) => {
  const { cardObject, imgFromForm } = props;

  return (
    <div className="card">
      <div className="card__wrapper">
        <div className="card__name">{cardObject.name ? cardObject.name : "Name"}</div>
        <div className="card__img">
          <img src={imgFromForm ? imgFromForm : logo} alt="card-img" />
        </div>
        <div className="card__creator">
          {cardObject.userImg ? <img src={cardObject.userImg} alt="userImg" /> : null}
          
          <h3>{cardObject.displayName ? cardObject.displayName : "Creator"}</h3>
          <h3>{cardObject.id ? cardObject.id : ""}</h3>
          
        </div>
        <div className="card__social">
          <div className="card__social_left">
            <div className="card__social-likes">
              <button className="card__likes-button">
                <img src={like} alt="like"/>
              </button>
            </div>
            <div className="card__social-dislikes">
              <button className="card__likes-button">
                <img src={dislike} alt="dislike"/>
              </button>
            </div>
          </div>
          <div className="card__social_right">
            <div className="card__social-favorite">
              <button className="card__likes-button">
                <img src={favorite} alt="favorite"/>
              </button>
            </div>
          </div>
        </div>
        
        <div className="card__components">
          <h3>Components:</h3>
          {cardObject.components &&
            cardObject.components.map((item, i) => (
              <div key={i}>
                <p>Name: {item.componentName && item.componentName}</p>
                <div className="card__components_component_stats">
                  <p>Kcal {item.componentKcalPerG ? item.componentKcalPerG : "-"}</p>
                  <p>Weight {item.componentWeight ? item.componentWeight : "-"}</p>
                  <p>Price {item.componentPricePerG ? item.componentPricePerG : "-"}</p>
                </div>
                <div className="card__component__divider"></div>
              </div>
            ))}
        </div>

        <div className="card__totals">
          <h3>Totals</h3>
          <div className="card__totals_wrapper">
            <div className="card__total-cal card__totals_wrapper-item">Kcal {cardObject.totalKcal ? cardObject.totalKcal : "-"}</div>
            <div className="card__total-weight card__totals_wrapper-item">Weight {cardObject.totalWeight ? cardObject.totalWeight : "-"}</div>
            <div className="card__total-price card__totals_wrapper-item">Price {cardObject.totalPrice ? cardObject.totalPrice : "-"}</div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Card;