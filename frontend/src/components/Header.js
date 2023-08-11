import React from 'react';
import headerLogo from '../images/header_logo.svg';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Header({ userData }) {
  const navigate = useNavigate();
  const location = useLocation();

  function signOut() {
    localStorage.removeItem('token');
    navigate('signin');
  }
  return (
    <header className='header'>
      <img className='header__logo' src={headerLogo} alt='Логотип Место' />
      <ul className='header__nav'>
        {location.pathname === '/' && (
          <li className='header__link header__user'>
              {userData && userData.email}
          </li>
        )}
        {location.pathname === '/signup' && (
          <li>
            <Link to='signin' className='header__link'>
              Войти
            </Link>
          </li>
        )}
        {location.pathname === '/signin' && (
          <li>
            <Link to='signup' className='header__link'>
              Регистрация
            </Link>
          </li>
        )}
        {location.pathname === '/' && (
          <li>
            <button className='header__link header__exit' onClick={signOut}>
              Выйти
            </button>
          </li>
        )}
      </ul>
    </header>
  );
}

export default Header;
