import React, { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../../../../../contexts/CurrentUserContext';

function EditProfile({ onSubmit }) {
  const { currentUser } = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');

  useEffect(() => {
    setName(currentUser.name || '');
    setAbout(currentUser.about || '');
  }, [currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, about });
  };

  return (
    <form className="popup__form" onSubmit={handleSubmit}>
      <label className="popup__label">
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          className="popup__input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          minLength="2"
          maxLength="40"
        />
        <span className="popup__error" id="name-error"></span>
      </label>
      <label className="popup__label">
        <input
          type="text"
          name="about"
          placeholder="Acerca de mí"
          className="popup__input"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          required
          minLength="2"
          maxLength="200"
        />
        <span className="popup__error" id="about-error"></span>
      </label>
      <button type="submit" className="popup__save-button">
        Guardar
      </button>
    </form>
  );
}

export default EditProfile;
