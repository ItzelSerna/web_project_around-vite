import React, { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Card from './Components/Card/Card';

function Main({
  cards,
  onCardLike,
  onCardDelete,
  onCardClick,
  onOpenPopup,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img
            id="profile-avatar"
            alt="imagen avatar"
            className="profile__avatar"
            src={currentUser?.avatar}
          />
          <button
            className="profile__edit-icon"
            onClick={() => onOpenPopup("edit-avatar")}
          ></button>
        </div>
        <div className="profile__info">
          <div className="profile__container">
            <h1 className="profile__name">{currentUser?.name}</h1>
            <button
              className="profile__edit-button"
              onClick={() => onOpenPopup("edit-profile")}
            ></button>
          </div>
          <p className="profile__about">{currentUser?.about}</p>
        </div>
        <button
          className="profile__add-button"
          onClick={() => onOpenPopup("add-place")}
        ></button>
      </section>
      <div className="cards">
        {cards.length > 0 ? (
          cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))
        ) : (
          <p>No hay tarjetas disponibles</p>
        )}
      </div>
    </main>
  );
}

export default Main;