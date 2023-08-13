import { options } from './constants';
class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    const token = localStorage.getItem('token');
    this._headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
    console.log(this._headers);
  }

  updateHeaders(token) {
    this._headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, {
      headers: this._headers,
      credentials: "include",
    }).then(this._checkResponse);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'GET',
      headers: this._headers,
      credentials: "include",
    }).then(this._checkResponse);
  }

  changeAvatar(url,) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        avatar: url,
      }),
    }).then(this._checkResponse);
  }

  changeUserInfo(name, occupation) {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        name: name,
        about: occupation,
      }),
    }).then(this._checkResponse);
  }

  postNewCard(cardName, url) {
    return fetch(`${this._baseUrl}cards`, {
      method: 'POST',
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        name: cardName,
        link: url,
      }),
    }).then(this._checkResponse);
  }
  putLike(cardId) {
    return fetch(`${this._baseUrl}cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
      credentials: "include",
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: "include",
    }).then(this._checkResponse);
  }

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: "include",
    }).then(this._checkResponse);
  }
  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.deleteLike(cardId);
    } else {
      return this.putLike(cardId);
    }
  }
}
const api = new Api(options);
export default api;
