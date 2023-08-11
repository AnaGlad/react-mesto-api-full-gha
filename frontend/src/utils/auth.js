import { authOptions } from './constants';

class Auth {
  constructor(authOptions) {
    this._baseUrl = authOptions.baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  register(email, password) {
    return fetch(`${this._baseUrl}signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    }).then(this._checkResponse);
  }

  authorize(email, password) {
    return fetch(`${this._baseUrl}signin`, {
      method: 'POST',
      credentials: "include",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    }).then(this._checkResponse);
  }

  getContent(token) {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }
}

const auth = new Auth(authOptions);
export default auth;
