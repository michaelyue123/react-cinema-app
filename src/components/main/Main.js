import React, { useState, useEffect, useRef } from 'react';
import MainContent from '../content/main-content/MainContent';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { LOAD_MORE_RESULTS, RESPONSE_PAGE, SET_ERROR, PATH_URL } from '../../redux/types';
import { loadMoreMovies, setResponsePageNumber } from '../../redux/actions/movies.action';
import { pathURL } from '../../redux/actions/routes.action';
import Spinner from '../spinner/Spinner';
import SearchResult from '../content/search-result/SearchResult';

// dispatch movie action
function dispatchAction(type, payload) {
  switch (type) {
    case RESPONSE_PAGE:
      return {
        type: RESPONSE_PAGE,
        payload
      };
    case LOAD_MORE_RESULTS:
      return {
        type: LOAD_MORE_RESULTS,
        payload
      };
    case SET_ERROR:
      return {
        type: SET_ERROR,
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

const Main = (props) => {
  const mainStyles = {
    textAlign: 'center',
    height: '100vh',
    backgroungColor: '#020e18',
    overflowY: 'scroll'
  };

  const [loading, setLoading] = useState(false);
  const { page, totalPages, movieType, searchResult } = useSelector((state) => state.movies);
  const errors = useSelector((state) => state.errors);

  const [currentPage, setCurrentPage] = useState(page);
  const mainRef = useRef();
  const bottomLineRef = useRef();
  const dispatch = useDispatch();
  const { match } = props;

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    async function fetchMovieData() {
      try {
        const payload = pathURL(match.path, match.url);
        dispatch(dispatchAction(PATH_URL, payload));
        const newPayload = setResponsePageNumber(currentPage, totalPages);
        dispatch(dispatchAction(RESPONSE_PAGE, newPayload));
      } catch (error) {
        if (error.response) {
          const payload = {
            message: error.response.data.message || error.response.data.status_message,
            statusCode: error.response.status
          };
          dispatch(dispatchAction(SET_ERROR, payload));
        }
      }
    }
    fetchMovieData();

    // eslint-disable-next-line
  }, [dispatch, currentPage, totalPages]);

  const fetchData = async () => {
    let pageNumber = currentPage;
    if (page < totalPages) {
      pageNumber += 1;
      setCurrentPage(pageNumber);
      const response = await loadMoreMovies(movieType, pageNumber);
      const { results, payload } = response;
      dispatch(dispatchAction(LOAD_MORE_RESULTS, { results, page: payload.page, totalPages: payload.totalPages }));
    }
  };

  const handleScroll = () => {
    const containerHeight = mainRef.current.getBoundingClientRect().height;
    const { top: bottomLineTop } = bottomLineRef.current.getBoundingClientRect();

    if (bottomLineTop <= containerHeight) {
      // fetch data
      fetchData();
    }
  };

  return (
    <>
      {!errors.message && !errors.statusCode && (
        <div className="main" style={mainStyles} ref={mainRef} onScroll={handleScroll}>
          {loading ? <Spinner /> : <>{searchResult && searchResult.length === 0 ? <MainContent /> : <SearchResult />}</>}
          <div ref={bottomLineRef}></div>
        </div>
      )}
    </>
  );
};

Main.propTypes = {
  list: PropTypes.array,
  page: PropTypes.number,
  totalPages: PropTypes.number,
  loadMoreMovies: PropTypes.func,
  setResponsePageNumber: PropTypes.func,
  movieType: PropTypes.string,
  searchResult: PropTypes.array,
  pathURL: PropTypes.func,
  match: PropTypes.object,
  errors: PropTypes.object
};

export default Main;
