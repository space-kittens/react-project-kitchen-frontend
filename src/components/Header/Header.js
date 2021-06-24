import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { colorBackground, fontFamily, colorText, animation } from '../../scss/styles';
import home from '../../images/icons/home.svg';
import logout from '../../images/icons/logout.svg';
import newPost from '../../images/icons/new-post.svg';
import settings from '../../images/icons/settings.svg';
import avatar from '../../images/icons/avatar.svg';

const StyledHeader = styled.header`
  background-color: ${colorBackground.secondary};
  padding: 10px 16px;
`;

const Nav = styled.nav`
  display: grid;
  grid-template-columns: auto 1fr;
  place-items: start end;
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
`;

const Logo = styled(NavLink)`
  font-family: ${fontFamily.exo2};
  font-size: 24px;
  line-height: 1.17;
  color: ${colorText.primary};
  text-shadow: 0 0 16px rgba(51, 51, 255, 0.25), 0 0 8px rgba(51, 51, 255, 0.25),
    0 4px 32px rgba(51, 51, 255, 0.5);

  &:hover {
    color: ${colorText.primary};
    text-decoration: none;
  }
`;

const List = styled.ul`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  max-width: 600px;
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const ListLink = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  font-family: ${fontFamily.jetBrains};
  font-size: 16px;
  line-height: 1.5;
  color: ${colorText.secondary};
  transition: ${animation.defaultTransition};

  &.active {
    color: ${colorText.primary};
  }

  &:hover,
  &:focus {
    color: ${colorText.primary};
    text-decoration: none;
  }
`;

const Icon = styled.img`
  margin-right: 8px;

  transform: ${(props) => props.rotate && 'rotate(-90deg)'};
`;

const LoggedOutView = ({ currentUser }) => {
  if (!currentUser) {
    return (
      <List>
        <li>
          <ListLink to='/' exact>
            <Icon src={home} alt='Главная' />
            Главная
          </ListLink>
        </li>
        <li>
          <ListLink to='/login'>
            <Icon src={logout} alt='Войти' />
            Войти
          </ListLink>
        </li>
        <li>
          <ListLink to='/register'>
            <Icon rotate src={logout} alt='Зарегистрироваться' />
            Зарегистрироваться
          </ListLink>
        </li>
      </List>
    );
  }
  return null;
};

const LoggedInView = ({ currentUser }) => {
  if (currentUser) {
    return (
      <List>
        <li>
          <ListLink to='/' exact>
            <Icon src={home} alt='Главная' />
            Главная
          </ListLink>
        </li>

        <li>
          <ListLink to='/editor'>
            <Icon src={newPost} alt='Новая запись' />
            Новая запись
          </ListLink>
        </li>

        <li>
          <ListLink to='/settings'>
            <Icon src={settings} alt='Настройки' />
            Настройки
          </ListLink>
        </li>

        <li>
          <ListLink to={`/@${currentUser.username}`}>
            <Icon src={avatar} alt='Аватарка' />
            {currentUser.username}
          </ListLink>
        </li>
      </List>
    );
  }

  return null;
};

const Header = ({ currentUser }) => (
  <StyledHeader>
    <Nav>
      <Logo to='/'>Проектная кухня</Logo>

      <LoggedOutView currentUser={currentUser} />

      <LoggedInView currentUser={currentUser} />
    </Nav>
  </StyledHeader>
);

export default Header;
