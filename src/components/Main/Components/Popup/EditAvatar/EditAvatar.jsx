import React, { useRef } from 'react';

function EditAvatar({ onSubmit }) {
  const avatarRef = useRef('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ avatar: avatarRef.current.value });
    avatarRef.current.value = '';
  };

  return (
    <form className="popup__form" onSubmit={handleSubmit}>
      <label className="popup__label">
        <input
          type="url"
          name="avatar"
          placeholder="URL de la imagen"
          className="popup__input"
          ref={avatarRef}
          required
        />
        <span className="popup__error" id="avatar-error"></span>
      </label>
      <button type="submit" className="popup__save-button">
        Guardar
      </button>
    </form>
  );
}

export default EditAvatar;
