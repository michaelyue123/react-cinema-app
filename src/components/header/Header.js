import React, { useState, useEffect } from 'react';
import cinemaLogo from '../../assets/cinema-logo.svg';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Header.scss';

import { MOVIE_LIST, MOVIE_TYPE, RESPONSE_PAGE, SET_ERROR, SEARCH_QUERY, SEARCH_RESULT, CLEAR_MOVIE_DETAILS, PATH_URL } from '../../redux/types';
import { getMovieData, setMovieType, setResponsePageNumber, searchMovieQuery, searchMovieResult, clearMovieDetails } from '../../redux/actions/movies.action';
import { pathURL } from '../../redux/actions/routes.action';
import { setError } from '../../redux/actions/error.action';

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
    case CLEAR_MOVIE_DETAILS:
      return {
        type: CLEAR_MOVIE_DETAILS,
        payload
      };
    case PATH_URL:
      return {
        type: PATH_URL,
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
  const [disableSearch, setDisableSearch] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);
  const { path, url, routesArray } = useSelector((state) => state.routes);
  const errors = useSelector((state) => state.errors);

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const detailsRoute = useRouteMatch('/:id/:name/details');

  useEffect(() => {
    console.log(process.env);
    if (routesArray.length) {
      if (!path && !url) {
        const payload = pathURL('/', '/');
        dispatch(dispatchMovieAction(PATH_URL, payload));
        const errorMsg = setError({ message: `Page with pathname ${location.pathname} not found with status code 404.`, statusCode: 404 });
        dispatch(dispatchMovieAction(SET_ERROR, errorMsg));
        const error = new Error(`Page with pathname ${location.pathname} not found with status code 404.`);
        throw error;
      }
    }
    // eslint-disable-next-line
  }, [path, url, routesArray, pathURL]);

  useEffect(() => {
    async function fetchMovieData() {
      try {
        if (path && !errors.message && !errors.statusCode) {
          const response = await getMovieData(type, page);
          const { results, payload } = response;

          dispatch(dispatchMovieAction(MOVIE_LIST, results));

          const response_1 = setResponsePageNumber(payload.page, payload.totalPages);
          dispatch(dispatchMovieAction(RESPONSE_PAGE, response_1));

          if (detailsRoute || location.pathname === '/') {
            setHideHeader(true);
          }

          if (location.pathname !== '/' && location.key) {
            setDisableSearch(true);
          }
        }
      } catch (error) {
        if (error.response) {
          const payload = {
            message: error.response.data.message || error.response.data.status_message,
            statusCode: error.response.status
          };
          dispatch(dispatchMovieAction(SET_ERROR, payload));
        }
      }
    }

    fetchMovieData();
    //eslint-disable-next-line
  }, [type, location, disableSearch, path]);

  useEffect(() => {
    if (errors.message || errors.statusCode) {
      const payload = pathURL('/', '/');
      dispatch(dispatchMovieAction(PATH_URL, payload));
      const error = new Error(`${errors.message} with status code ${errors.statusCode}`);
      throw error;
    }

    // eslint-disable-next-line
  }, [errors]);

  const setMovieTypeUrl = async (type) => {
    setDisableSearch(false);
    if (location.pathname !== '/') {
      const result = clearMovieDetails([]);
      dispatch(dispatchMovieAction(CLEAR_MOVIE_DETAILS, result));
      history.push('/');
    }

    setType(type);
    dispatch(dispatchMovieAction(SEARCH_RESULT, []));
    const clickedType = setMovieType(type);
    dispatch(dispatchMovieAction(MOVIE_TYPE, clickedType));
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
        const payload = {
          message: error.response.data.message || error.response.data.status_message,
          statusCode: error.response.status
        };
        dispatch(dispatchMovieAction(SET_ERROR, payload));
      }
    }
  };

  const navigateToHomePage = () => {
    try {
      setDisableSearch(false);
      const result = clearMovieDetails([]);
      dispatch(dispatchMovieAction(CLEAR_MOVIE_DETAILS, result));

      dispatch(dispatchMovieAction(SEARCH_RESULT, []));
      setType('now_playing');
      setMovieType('now_playing');
      history.push('/');
    } catch (error) {
      if (error.response) {
        const payload = {
          message: error.response.data.message || error.response.data.status_message,
          statusCode: error.response.status
        };
        dispatch(dispatchMovieAction(SET_ERROR, payload));
      }
    }
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
      {hideHeader && (
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

              <input className={`search-input ${disableSearch ? 'disabled' : ''}`} type="text" placeholder="Search for a movie" value={search} onChange={onSearchChange} />
              <button type="button" id="search" className={`btn btn-primary btn-sm ${disableSearch ? 'disabled' : ''}`} onClick={onClickSearch}>
                <i className="fa fa-search"></i>
              </button>
            </ul>
          </div>
        </div>
      )}
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
  searchResult: PropTypes.func,
  routesArray: PropTypes.array,
  path: PropTypes.string,
  url: PropTypes.string,
  pathURL: PropTypes.func,
  setError: PropTypes.func,
  errors: PropTypes.object
};

export default Header;
