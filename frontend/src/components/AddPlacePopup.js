import React from 'react';
import PopupWithForm from '../components/PopupWithForm';
function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [cardName, setCardName] = React.useState('');
  const [url, setUrl] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(cardName, url);
  }

  function handleCardNameChange(e) {
    setCardName(e.target.value);
  }

  function handleUrlChange(e) {
    setUrl(e.target.value);
  }

  return (
    <PopupWithForm
      name='add'
      title='Новое место'
      children={
        <>
          <label className='popup__label'>
            <input
              type='text'
              name='name'
              className='popup__form-text popup__form-text_type_place'
              placeholder='Название'
              minLength='2'
              maxLength='30'
              value={cardName}
              required
              onChange={handleCardNameChange}
            />
            <span className='popup__form-text-error popup__form-text-error_type_name'></span>
          </label>
          <label className='popup__label'>
            <input
              name='link'
              className='popup__form-text popup__form-text_type_place-link'
              placeholder='Ссылка на картинку'
              type='url'
              value={url}
              onChange={handleUrlChange}
              required
            />
            <span className='popup__form-text-error popup__form-text-error_type_link'></span>
          </label>
        </>
      }
      buttonName='Создать'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    ></PopupWithForm>
  );
}

export default AddPlacePopup;
