const BASE_URL = "https://around-api.es.tripleten-services.com/v1";
const TOKEN = "df55ef7f-6b66-49fb-9a53-d534a83fabcc";

const api = {
  getUserInfo() {
    return fetch(`${BASE_URL}/users/me`, {
      headers: {
        authorization: TOKEN,
      },
    })
      .then((res) => {
        if (!res.ok) {
          console.error(`Error al obtener datos del usuario: ${res.status}`);
          return Promise.reject(`Error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Datos del usuario recibidos desde la API:", data);
        return data;
      });
  },

  setUserInfo({ name, about }) {
    console.log("Actualizando información del usuario...");
    return fetch(`${BASE_URL}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: TOKEN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, about }),
    })
      .then((res) => {
        if (!res.ok) {
          console.error(`Error al actualizar los datos del usuario: ${res.status}`);
          return Promise.reject(`Error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Datos del usuario actualizados en la API:", data);
        return data;
      });
  },

  getCards() {
    return fetch(`${BASE_URL}/cards/`, {
      headers: {
        authorization: TOKEN,
      },
    })
      .then((res) => {
        if (!res.ok) {
          console.error(`Error al obtener las tarjetas: ${res.status}`);
          return Promise.reject(`Error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        return data;
      });
  },

  changeLikeCardStatus(cardId, isLiked) {
    const method = isLiked ? "PUT" : "DELETE";
    return fetch(`${BASE_URL}/cards/${cardId}/likes`, {
      method: method,
      headers: {
        authorization: TOKEN,
      },
    })
      .then((res) => {
        if (!res.ok) {
          console.error(`Error al cambiar el estado de like: ${res.status}`);
          return Promise.reject(`Error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Datos de la tarjeta actualizada desde la API:", data);
        return data;
      });
  },
  
  deleteCard(cardId) {
    console.log(`Eliminando tarjeta con ID: ${cardId}`);
    return fetch(`${BASE_URL}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: TOKEN,
      },
    })
      .then((res) => {
        if (!res.ok) {
          console.error(`Error al eliminar la tarjeta: ${res.status}`);
          return Promise.reject(`Error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Tarjeta eliminada en la API con ID:", data);
        return data;
      });
  },

  setUserAvatar({ avatar }) {
    console.log("Actualizando avatar del usuario...");
    return fetch(`${BASE_URL}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: TOKEN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ avatar }),
    })
      .then((res) => {
        if (!res.ok) {
          console.error(`Error al actualizar el avatar: ${res.status}`);
          return Promise.reject(`Error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Avatar del usuario actualizado en la API:", data);
        return data;
      });
  },

  addCard({ name, link }) {
    console.log("Agregando nueva tarjeta...");
    return fetch(`${BASE_URL}/cards`, {
      method: "POST",
      headers: {
        authorization: TOKEN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, link }),
    })
      .then((res) => {
        if (!res.ok) {
          console.error(`Error al agregar la tarjeta: ${res.status}`);
          return Promise.reject(`Error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Tarjeta agregada en la API:", data);
        return data;
      });
  },
};

export default api;
