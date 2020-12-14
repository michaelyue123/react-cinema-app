import React, { useState, useEffect } from 'react';
import cinemaLogo from '../../assets/cinema-logo.svg';
// import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import './Header.scss';
import { MOVIE_LIST, RESPONSE_PAGE, SET_ERROR } from '../../redux/types';
import { MOVIE_API_URL } from '../../services/movies.service';

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

// dispatch movie action 
function dispatchMovieAction(type, payload) {
  switch (type) {
    case MOVIE_LIST:
      return { type: MOVIE_LIST, payload};
    case RESPONSE_PAGE:
      return {
        type: RESPONSE_PAGE,
        payload
      };
    case SET_ERROR:
      return {
        type: SET_ERROR,
        payload
      };
    default:
      return "";
  }

}


const Header = () => {
  const [navClass, setNavClass] = useState(false);
  const [menuClass, setMenuClass] = useState(false);
  const dispatch = useDispatch();


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await MOVIE_API_URL('now_playing', 1);
        const { results, page, total_pages } = response.data;
        const payload = {
          page,
          totalPages: total_pages
        }
        dispatch(dispatchMovieAction(MOVIE_LIST, results));
        dispatch(dispatchMovieAction(RESPONSE_PAGE, payload))
      }
      catch(error) {
        if(error.response) {
          dispatch(dispatchMovieAction(SET_ERROR, error.response.data.message));
        }
      }  
    }
    fetchData();

  }, [dispatch])


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
            {HEADER_LIST && HEADER_LIST.map((data) => (
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
