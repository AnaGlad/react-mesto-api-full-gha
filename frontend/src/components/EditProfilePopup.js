import React from 'react';
import PopupWithForm from '../components/PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name='edit'
      title='Редактировать профиль'
      buttonName='Сохранить'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className='popup__label'>
        <input
          type='text'
          name='name'
          value={name || ''}
          onChange={handleNameChange}
          className='popup__form-text popup__form-text_type_name'
          placeholder='Имя'
          minLength='2'
          maxLength='40'
          required
        />
        <span className='popup__form-text-error popup__form-text-error_type_name'></span>
      </label>
      <label className='popup__label'>
        <input
          type='text'
          name='occupation'
          value={description || ''}
          onChange={handleDescriptionChange}
          className='popup__form-text popup__form-text_type_occupation'
          placeholder='Вид деятельности'
          minLength='2'
          maxLength='200'
          required
        />
        <span className='popup__form-text-error popup__form-text-error_type_occupation'></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
