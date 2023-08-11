import RegisterOk from '../images/register_ok.svg';
import RegisterWrong from '../images/register_wrong.svg';

import React from 'react';

function InfoTooltip({ name, isOpen, onClose, isRegister, text }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className='popup__container'>
        <button
          className='popup__close-button hover'
          type='button'
          title='Close'
          onClick={onClose}
        ></button>
        <img
          className='popup__logo'
          src={isRegister ? RegisterOk : RegisterWrong}
          alt={text}
        />
        <h2 className='popup__title popup__info'>{text}</h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
