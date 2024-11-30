import React from 'react';
import Popup from '../Popup';

function RemoveCard({ isOpen, onClose, onConfirmDelete }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirmDelete();
  };

  return (
    <Popup
      name="confirm-delete"
      title="¿Estás seguro?"
      isOpen={isOpen}
      onClose={onClose}
    >
      <form className="popup__form" onSubmit={handleSubmit}>
        <button type="submit" className="popup__save-button">
          Sí
        </button>
      </form>
    </Popup>
  );
}

export default RemoveCard;
