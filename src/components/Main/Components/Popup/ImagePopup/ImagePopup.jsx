import React from "react";

function ImagePopup({ card, onClose }) {
  // Manejar clics en el overlay para cerrar el popup
  const handleOverlayClick = (event) => {
    if (event.target.classList.contains("popup")) {
      onClose();
    }
  };

  return (
    <div
      className={`popup popup_type_image ${card ? "popup_is-opened" : ""}`}
      onClick={handleOverlayClick} // Detecta clics en el overlay
    >
      <div className="popup__content-image">
        <button
          className="popup__close-button-image"
          onClick={onClose}
          aria-label="Cerrar popup"
        >
          ×
        </button>
        {card && (
          <>
            <img
              className="popup__image"
              src={card.link}
              alt={card.name}
            />
            <h2 className="popup__image-title">{card.name}</h2>
          </>
        )}
      </div>
    </div>
  );
}

export default ImagePopup;
