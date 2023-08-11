import React from 'react';
function ImagePopup({ card, onClose }) {
  return (
    <div
      className={`popup popup_type_zoomimg ${
        card != null ? 'popup_opened' : ''
      }`}
    >
      <div className='popup__container-img'>
        <button
          className='popup__close-button hover'
          type='button'
          title='Close'
          onClick={onClose}
        ></button>
        <img className='popup__photo-zoom' src={card?.link} alt={card?.name} />
        <h3 className='popup__photo-name'>{card != null ? card.name : ''}</h3>
      </div>
    </div>
  );
}

export default ImagePopup;
