import React, { useContext } from "react";
import { CurrentUserContext } from "../../../../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const { currentUser } = useContext(CurrentUserContext);
  const likes = card.likes || [];
  const isOwn = card.owner === currentUser._id;
  const isLiked = likes.some((like) => like === currentUser._id);
  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <div className="card">
      <img
        className="card__photo"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      {isOwn && (
        <button
          className="card__delete-button"
          onClick={handleDeleteClick}
          aria-label="Eliminar tarjeta"
        ></button>
      )}
      <div className="card__info">
        <p className="card__info-name">{card.name}</p>
        <div className="card__container-likes">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
            aria-label="Dar like"
          ></button>
          <div className="card__likes">{likes.length}</div>
        </div>
      </div>
    </div>
  );
}

export default Card;