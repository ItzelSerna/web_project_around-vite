import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import EditProfile from "./Main/Components/Popup/EditProfile/EditProfile";
import EditAvatar from "./Main/Components/Popup/EditAvatar/EditAvatar";
import NewCard from "./Main/Components/Popup/NewCard/NewCard";
import RemoveCard from "./Main/Components/Popup/RemoveCard/RemoveCard";
import { useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isRemoveCardPopupOpen, setIsRemoveCardPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: "",
    userId: "",
    _id: "",
  });  
  
  const [cards, setCards] = useState([]);
  const [deletedCard, setDeletedCard] = useState(null);

  useEffect(() => {
    api
      .getUserInfo()
      .then((info) => {
        const userData = {
          name: info.name,
          about: info.about,
          avatar: info.avatar,
          userId: info._id,
          _id: info._id,
        };
        console.log("Datos del usuario recibidos desde la API:", userData);
        setCurrentUser(userData);
      })
      .catch((err) =>
        console.error(`Error al cargar los datos de usuario: ${err}`)
      );
  
    api
    .getCards()
    .then((cardsData) => {
      const normalizedCards = cardsData.map((card) => ({
        ...card,
        likes: card.likes || [], 
        owner: typeof card.owner === "string" ? { _id: card.owner } : card.owner, 
      }));
      console.log("Tarjetas normalizadas:", normalizedCards);
      setCards(normalizedCards);
    })
    .catch((err) => console.error(`Error al obtener las tarjetas: ${err}`));
  }, []);
  
  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);
  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);
  
  const handleRemoveCardClick = (card) => {
    setDeletedCard(card); 
    setIsRemoveCardPopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsRemoveCardPopupOpen(false);
    setSelectedCard(null);
    setDeletedCard(null);
  };

  const handleUpdateUser = async (userData) => {
    try {
      const updatedUser = await api.setUserInfo(userData);
      setCurrentUser(updatedUser);
      closeAllPopups();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateAvatar = async (avatarData) => {
    try {
      const updatedUser = await api.setUserAvatar(avatarData);
      setCurrentUser(updatedUser);
      closeAllPopups();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCardClick = (card) => {
    console.log("Tarjeta seleccionada:", card);
    setSelectedCard(card);
  };
  
  function handleCardLike(card, isLiked) {
    api.changeLikeCardStatus(card._id, isLiked)
      .then((updatedCard) => {
        setCards((prevCards) =>
          prevCards.map((c) => (c._id === updatedCard._id ? updatedCard : c))
        );
      })
      .catch((err) => console.error("Error al actualizar el like:", err));
  }
  
  const handleAddPlaceSubmit = (cardData) => {
    api.addCard(cardData)
      .then((newCard) => {
        const normalizedCard = {
          ...newCard,
          likes: newCard.likes || [],
          owner: typeof newCard.owner === "string" ? { _id: newCard.owner } : newCard.owner,
        };
  
        setCards([normalizedCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.error("Error al agregar la tarjeta:", err));
  };
  

  const handleCardDelete = async () => {
    try {
      await api.deleteCard(deletedCard._id); 
      setCards((prevCards) =>
        prevCards.filter((c) => c._id !== deletedCard._id) 
      );
      closeAllPopups();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          cards={cards}
          onEditAvatarClick={handleEditAvatarClick}
          onAddPlaceClick={handleAddPlaceClick}
          onEditProfileClick={handleEditProfileClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleRemoveCardClick}
          selectedCard={selectedCard}
          onClose={closeAllPopups}
        />
        <Footer />
        {/* Popups */}
        <EditProfile
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleUpdateUser}
        />
        <EditAvatar
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleUpdateAvatar}
        />
        <NewCard
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleAddPlaceSubmit}
        />
        <RemoveCard
          isOpen={isRemoveCardPopupOpen}
          onClose={closeAllPopups}
          onConfirmDelete={handleCardDelete}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
