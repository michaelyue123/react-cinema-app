import React, { useState, useEffect } from 'react';
import cinemaLogo from '../../assets/cinema-logo.svg';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import './Header.scss';
import { MOVIE_LIST, MOVIE_TYPE, RESPONSE_PAGE, SET_ERROR, SEARCH_QUERY, SEARCH_RESULT } from '../../redux/types';
import { getMovieData, setMovieType, setResponsePageNumber, searchMovieQuery, searchMovieResult } from '../../redux/actions/movies.action';
import { useHistory } from 'react-router-dom';

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
      return {
        type: MOVIE_LIST,
        payload
      };
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
    case MOVIE_TYPE:
      return {
        type: MOVIE_TYPE,
        payload
      };
    case SEARCH_QUERY:
      return {
        type: SEARCH_QUERY,
        payload
      };
    case SEARCH_RESULT:
      return {
        type: SEARCH_RESULT,
        payload
      };
    default:
      return payload;
  }
}

const Header = () => {
  const [navClass, setNavClass] = useState(false);
  const [menuClass, setMenuClass] = useState(false);
  const [type, setType] = useState('now_playing');
  const [page] = useState(1);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    async function fetchMovieData() {
      try {
        const response = await getMovieData(type, page);
        const { results, payload } = response;

        console.log(type);

        dispatch(dispatchMovieAction(MOVIE_LIST, results));

        const response_1 = setResponsePageNumber(payload.page, payload.totalPages);
        dispatch(dispatchMovieAction(RESPONSE_PAGE, response_1));
      } catch (error) {
        if (error.response) {
          dispatch(dispatchMovieAction(SET_ERROR, error.response.data.message));
        }
      }
    }
    fetchMovieData();

    //eslint-disable-next-line
  }, [type]);

  const setMovieTypeUrl = async (type) => {
    setType(type);
    const clickedType = setMovieType(type);
    dispatch(dispatchMovieAction(MOVIE_TYPE, clickedType));

    dispatch(dispatchMovieAction(SEARCH_RESULT, []));
  };

  const onSearchChange = async (e) => {
    const { value } = e.target;
    setSearch(value);
  };

  const onClickSearch = async () => {
    try {
      const response = searchMovieQuery(search);
      dispatch(dispatchMovieAction(SEARCH_QUERY, response));

      const response_1 = await searchMovieResult(search);
      dispatch(dispatchMovieAction(SEARCH_RESULT, response_1));
    } catch (error) {
      if (error.response) {
        dispatch(dispatchMovieAction(SET_ERROR, error.response.data.message));
      }
    }
  };

  const navigateToHomePage = () => {
    history.push('/');
  };

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
          <div className="header-image" onClick={() => navigateToHomePage()}>
            <img src={cinemaLogo} alt="" />
          </div>
          <div className={`${menuClass ? 'header-menu-toggle is-active' : 'header-menu-toggle'}`} id="header-mobile-menu" onClick={() => toggleMenu()}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
          <ul className={`${navClass ? 'header-nav header-mobile-nav' : 'header-nav'}`}>
            {HEADER_LIST &&
              HEADER_LIST.map((data) => (
                <li className={data.type === type ? 'header-nav-item active-item' : 'header-nav-item'} key={data.id} onClick={() => setMovieTypeUrl(data.type)}>
                  <span className="header-list-name">
                    <i className={data.iconClass}></i>
                  </span>
                  &nbsp;
                  <span className="header-list-name">{data.name}</span>
                </li>
              ))}
            <input className="search-input" type="text" placeholder="Search for a movie" value={search} onChange={onSearchChange} />
            <button type="button" id="search" className="btn btn-primary btn-sm" onClick={onClickSearch}>
              <i className="fa fa-search"></i>
            </button>
          </ul>
        </div>
      </div>
    </>
  );
};

Header.propTypes = {
  getMovieData: PropTypes.func,
  setMovieType: PropTypes.func,
  setResponsePageNumber: PropTypes.func,
  list: PropTypes.array,
  page: PropTypes.number,
  totalPages: PropTypes.number,
  searchQuery: PropTypes.func,
  searchResult: PropTypes.func
};

export default Header;
