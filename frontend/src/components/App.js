import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';
import PopupWithForm from '../components/PopupWithForm';
import ImagePopup from '../components/ImagePopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from '../components/EditProfilePopup';
import EditAvatarPopup from '../components/EditAvatarPopup';
import AddPlacePopup from '../components/AddPlacePopup';
import Login from '../components/Login';
import Register from '../components/Register';
import InfoTooltip from '../components/InfoTooltip';

import { Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import auth from '../utils/auth';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [userData, setUserData] = useState(null);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [tooltipText, setTooltipText] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      api
        .getInitialCards()
        .then((data) => {
          setCards(
            data.map((item) => ({
              ...item,
            }))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      api
        .getUserInfo()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedIn]);

  function checkToken() {
    const token = localStorage.getItem('token');
    auth
      .getContent(token)
      .then((data) => {
        console.log(data);
        if (!data) {
          return;
        }
        setUserData(data);
        setIsLoggedIn(true);
        navigate('/');
      })
      .catch((error) => {
        setIsLoggedIn(false);
        setUserData(null);
      });
  }

  useEffect(() => {
    checkToken();
  }, []);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((like) => like === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        console.log(newCard);
        const newCards = cards.map((card) =>
          card._id === newCard._id ? newCard : card
        );
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(id) {
    api
      .deleteCard(id)
      .then(() => {
        setCards((cards) => cards.filter((card) => card._id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(user) {
    api
      .changeUserInfo(user.name, user.about)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleUpdateAvatar(newurl) {
    api
      .changeAvatar(newurl)
      .then((url) => {
        setCurrentUser(url);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleAddPlaceSubmit(cardName, url) {
    api
      .postNewCard(cardName, url)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleOpenTooltip(isRegister) {
    setIsRegister(isRegister);
    if (isRegister) {
      setTooltipText('Вы успешно зарегистрировались!');
    } else {
      setTooltipText('Что-то пошло не так! Попробуйте ещё раз.');
    }
    setIsInfoTooltipOpen(true);
  }

  function handleLogin(formValue) {
    auth
      .authorize(formValue.email, formValue.password)
      .then((data) => {
        localStorage.setItem('token', data.token);
        checkToken();
        api.updateHeaders(data.token)
        navigate('/');
      })
      .catch((error) => {
        handleOpenTooltip(false);
        console.log(error);
      });
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard(null);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='root'>
        <div className='page'>
          <Header userData={userData} />
          <Routes>
            <Route
              exact
              path='/'
              element={
                <ProtectedRoute
                  element={Main}
                  isLoggedIn={isLoggedIn}
                  cards={cards}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  onCardClick={handleCardClick}
                  footer={<Footer />}
                />
              }
            />
            <Route
              exact
              path='/signin'
              element={
                <Login
                  onLogin={(formValue) => handleLogin(formValue)}
                  buttonName={'Войти'}
                />
              }
            />
            <Route
              exact
              path='/signup'
              element={
                <Register
                  handleRegister={handleOpenTooltip}
                  buttonName={'Зарегистрироваться'}
                />
              }
            />
          </Routes>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <PopupWithForm
            name='remove'
            title='Вы уверены?'
            children={<></>}
            buttonName='Да'
          ></PopupWithForm>
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <InfoTooltip
            name='register_check'
            isOpen={isInfoTooltipOpen}
            isRegister={isRegister}
            onClose={closeAllPopups}
            text={tooltipText}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
