import React, { useState } from 'react';
import cinemaLogo from '../../assets/cinema-logo.svg';
import './Header.scss';

const HEADER_LIST = [
  {
    id: 1,
    iconClass: 'fas fa-film',
    name: 'Now Playing',
    type: 'now_playing'
  },
  {
    id: 2,
    iconClass: 'fas fa-fire',
    name: 'Popular',
    type: 'popular'
  },
  {
    id: 3,
    iconClass: 'fas fa-star',
    name: 'Top Rated',
    type: 'top-rated'
  },
  {
    id: 4,
    iconClass: 'fas fa-plus-square',
    name: 'Upcoming',
    type: 'upcoming'
  }
];

const Header = () => {
  const [navClass, setNavClass] = useState(false);
  const [menuClass, setMenuClass] = useState(false);

  const toggleMenu = () => {
    setNavClass(!navClass);
    setMenuClass(!menuClass);
    if (navClass) {
      document.body.classList.add('header-nav-open');
    } else {
      document.body.classList.remove('header-nav-open');
    }
  };

  return (
    <>
      <div className="header-nav-wrapper">
        <div className="header-bar"></div>
        <div className="header-navbar">
          <div className="header-image">
            <img src={cinemaLogo} alt="" />
          </div>
          <div className={`${menuClass ? 'header-menu-toggle is-active' : 'header-menu-toggle'}`} id="header-mobile-menu" onClick={() => toggleMenu()}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
          <ul className={`${navClass ? 'header-nav header-mobile-nav' : 'header-nav'}`}>
            {HEADER_LIST.map((data) => (
              <li className="header-nav-item" key={data.id}>
                <span className="header-list-name">
                  <i className={data.iconClass}></i>
                </span>
                &nbsp;
                <span className="header-list-name">{data.name}</span>
              </li>
            ))}
            <li className="header-nav-item">Now Playing</li>
            <li className="header-nav-item">New Movies</li>
            <input className="search-input" type="text" placeholder="Search for a movie" />
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
