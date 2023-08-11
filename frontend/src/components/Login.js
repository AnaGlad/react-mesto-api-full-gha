import React, { useState } from 'react';

function Login({ buttonName, onLogin }) {
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(formValue);
  }

  return (
    <>
      <div className='signin'>
        <div className='signin__container'>
          <h2 className='signin__title'>Вход</h2>
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
        </div>
      </div>
    </>
  );
}

export default Login;
