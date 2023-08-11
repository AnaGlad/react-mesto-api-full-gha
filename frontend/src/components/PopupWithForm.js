import React from 'react';

function PopupWithForm({
  name,
  title,
  children,
  buttonName,
  isOpen,
  onClose,
  onSubmit,
}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className='popup__container'>
        <button
          className='popup__close-button hover'
          type='button'
          title='Close'
          onClick={onClose}
        ></button>
        <h2 className='popup__title popup__title_type_remove'>{title}</h2>
        <form
          className='popup__form'
          name={name}
          noValidate
          onSubmit={onSubmit}
        >
          {children}
          <button className='popup__form-save-button' type='submit'>
            {buttonName}
          </button>
        </form>
      </div>
    </div>
  );
}
export default PopupWithForm;
