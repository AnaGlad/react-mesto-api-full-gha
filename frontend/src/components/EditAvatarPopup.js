import React from 'react';
import PopupWithForm from '../components/PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const inputRef = React.useRef({});

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(inputRef.current.value);
  }

  return (
    <PopupWithForm
      name='change-avatar'
      title='Обновить аватар'
      children={
        <>
          <label className='popup__label popup__label_type_avatar'>
            <input
              name='change-avatar'
              className='popup__form-text popup__form-text_type_avatar'
              placeholder='Ссылка на картинку'
              type='url'
              ref={inputRef}
              required
            />
            <span className='popup__form-text-error popup__form-text-error_type_change-avatar'></span>
          </label>
        </>
      }
      buttonName='Сохранить'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    ></PopupWithForm>
  );
}

export default EditAvatarPopup;
