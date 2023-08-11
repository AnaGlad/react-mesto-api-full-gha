import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  // console.log(card.owner);
  const isLiked = card.likes.some((like) => like === currentUser._id);
  const cardLikeButtonClassName = `elements__like-button ${
    isLiked && 'elements__like-button_active'
  }`;
  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card._id);
  }
  return (
    <>
      <div className='elements__grid'>
        {isOwn && (
          <button
            className='elements__trash-button hover'
            type='button'
            onClick={handleDeleteClick}
          ></button>
        )}
        <div
          className='elements__photo-grid'
          style={{ backgroundImage: `url(${card.link})` }}
          title={card.name}
          onClick={handleClick}
        ></div>
        <div className='elements__grid-content'>
          <h2 className='elements__grid-text'>{card.name}</h2>
          <div className='elements__like'>
            <button
              className={cardLikeButtonClassName}
              type='button'
              onClick={handleLikeClick}
            ></button>
            <span className='elements__like-counter' id='counter'>
              {card.likes.length}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
