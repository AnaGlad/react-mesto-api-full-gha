import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../utils/auth';

function Register({ handleRegister, buttonName }) {
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    auth
      .register(formValue.email, formValue.password)
      .then(() => {
        handleRegister(true);
        navigate('/signin');
      })
      .catch((error) => {
        handleRegister(false);
        console.log(error);
      });
  }

  return (
    <>
      <div className='signin'>
        <div className='signin__container'>
          <h2 className='signin__title'>Регистрация</h2>
          <form className='signin__form' noValidate onSubmit={handleSubmit}>
            <label className='signin__label'>
              <input
                type='email'
                name='email'
                value={formValue.email}
                onChange={handleChange}
                className='signin__form-text signin__form-text_type_email'
                placeholder='Email'
                required
              />
            </label>
            <label className='signin__label'>
              <input
                type='password'
                name='password'
                value={formValue.password}
                onChange={handleChange}
                className='signin__form-text signin__form-text_type_occupation'
                placeholder='Пароль'
                required
              />
            </label>
            <button className='signin__form-save-button' type='submit'>
              {buttonName}
            </button>
          </form>
          <Link to='/signin' className='signin__register-link'>
            <p>Уже зарегистрированы? Войти</p>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Register;
