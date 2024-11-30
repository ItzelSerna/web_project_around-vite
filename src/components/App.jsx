import React, { useState, useEffect } from "react";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import Popup from "./Main/Components/Popup/Popup";
import ImagePopup from "./Main/Components/Popup/ImagePopup/ImagePopup";
import EditProfile from "./Main/Components/Popup/EditProfile/EditProfile";
import EditAvatar from "./Main/Components/Popup/EditAvatar/EditAvatar";
import NewCard from './Main/Components/Popup/NewCard/NewCard';
import RemoveCard from './Main/Components/Popup/RemoveCard/RemoveCard';

function App() {
  const [popup, setPopup] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [cardToDelete, setCardToDelete] = useState(null);

  useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) =>
        console.error(`Error al cargar los datos de usuario: ${err}`)
      );
  }, []);

  useEffect(() => {
    if (!currentUser._id) return; 
  
    api
      .getCards()
      .then((cardsData) => {
        const normalizedCards = cardsData.map((card) => ({
          ...card,
          likes: card.likes || [],
        }));
        setCards(normalizedCards);
      })
      .catch((err) => console.error(`Error al obtener las tarjetas: ${err}`));
  }, [currentUser]);  

  const handleOpenPopup = (popupType) => {
    setPopup(popupType);
  };

  const handleClosePopup = () => {
    setPopup(null);
    setSelectedCard(null);
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("popup__overlay")) {
      handleClosePopup();
    }
  };

  const handleUpdateUser = async (userData) => {
    try {
      const updatedUserData = await api.setUserInfo(userData);
      setCurrentUser(updatedUserData);
      handleClosePopup();
    } catch (err) {
      console.error(`Error al actualizar los datos: ${err}`);
    }
  };

  const handleUpdateAvatar = async (data) => {
    try {
      const updatedUserData = await api.setUserAvatar(data);
      setCurrentUser(updatedUserData);
      handleClosePopup();
    } catch (err) {
      console.error(`Error al actualizar el avatar: ${err}`);
    }
  };

  const handleCardLike = async (card) => {
    const isLiked = card.likes ? card.likes.some((like) => like === currentUser._id) : false;
    try {
      const newCard = await api.changeLikeCardStatus(card._id, !isLiked);
      setCards((state) =>
        state.map((currentCard) =>
          currentCard._id === card._id ? newCard : currentCard
        )
      );
    } catch (err) {
      console.error(`Error al actualizar el estado de "me gusta": ${err}`);
    }
  };  

  const handleCardDelete = (card) => {
    setCardToDelete(card);
    handleOpenPopup('confirm-delete');
  };

  const handleConfirmDelete = async () => {
    try {
      await api.deleteCard(cardToDelete._id);
      setCards((state) =>
        state.filter((currentCard) => currentCard._id !== cardToDelete._id)
      );
      setCardToDelete(null);
      handleClosePopup();
    } catch (err) {
      console.error(`Error al eliminar tarjeta: ${err}`);
    }
  };  

  const handleAddPlaceSubmit = async (newCardData) => {
    try {
      const newCard = await api.addCard(newCardData);
      setCards([newCard, ...cards]);
      handleClosePopup();
    } catch (err) {
      console.error(`Error al agregar tarjeta: ${err}`);
    }
  };  

  return (
    <CurrentUserContext.Provider value={{ currentUser, handleUpdateUser }}>
      <div className="page">
        <Header />
        <Main
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          onCardClick={setSelectedCard}
          onOpenPopup={handleOpenPopup}
        />
        {selectedCard && (
          <div className="popup__overlay" onClick={handleOverlayClick}>
            <ImagePopup card={selectedCard} onClose={handleClosePopup} />
          </div>
        )}
        <Footer />

        {popup === "edit-profile" && (
          <Popup
            title="Edit profile"
            name="edit-profile"
            isOpen={!!popup}
            onClose={handleClosePopup}
            buttonText="Guardar"
          >
            <EditProfile onSubmit={handleUpdateUser} />
          </Popup>
        )}

        {popup === "add-place" && (
          <Popup
            title="New place"
            name="add-place"
            isOpen={!!popup}
            onClose={handleClosePopup}
            buttonText="Crear"
          >
            <NewCard onSubmit={handleAddPlaceSubmit} />
          </Popup>
        )}

        {popup === "edit-avatar" && (
          <Popup
            title="Change profile photo"
            name="edit-avatar"
            isOpen={!!popup}
            onClose={handleClosePopup}
            buttonText="Guardar"
          >
            <EditAvatar onSubmit={handleUpdateAvatar} />
          </Popup>
        )}

        {popup === 'confirm-delete' && (
          <RemoveCard
            isOpen={popup === 'confirm-delete'}
            onClose={handleClosePopup}
            onConfirmDelete={handleConfirmDelete}
          />
        )}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;