import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from '../components/Card';

function Main({
  cards,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardLike,
  onCardDelete,
  onCardClick,
  footer,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      <main>
        <section className='profile'>
          <div
            className='profile__avatar'
            onClick={onEditAvatar}
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
          >
            <div className='profile__edit-pencil'></div>
          </div>
          <div className='profile__info'>
            <h1 className='profile__name'>{currentUser.name}</h1>
            <button
              onClick={onEditProfile}
              className='profile__edit-button hover'
              type='button'
              title='Save'
            ></button>
            <p className='profile__occupation'>{currentUser.about}</p>
          </div>
          <button
            onClick={onAddPlace}
            className='profile__add-button hover'
            type='button'
            title='Create'
          ></button>
        </section>
        <section className='elements'>
          {cards.map((props) => (
            <Card
              key={props._id}
              card={props}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </section>
      </main>
      {footer}
    </>
  );
}

export default Main;
