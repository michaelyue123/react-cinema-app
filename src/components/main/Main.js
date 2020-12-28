import React, { useState, useEffect, useRef } from 'react';
import MainContent from '../content/main-content/MainContent';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { LOAD_MORE_RESULTS, RESPONSE_PAGE, SET_ERROR } from '../../redux/types';
import { loadMoreMovies, setResponsePageNumber } from '../../redux/actions/movies.action';
import Spinner from '../spinner/Spinner';
import SearchResult from '../content/search-result/SearchResult';
import { useHistory } from 'react-router-dom';

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
    default:
      return payload;
  }
}

const Main = ({ onClick }) => {
  const mainStyles = {
    textAlign: 'center',
    height: '100vh',
    backgroungColor: '#020e18',
    overflowY: 'scroll'
  };

  const [loading, setLoading] = useState(false);
  const { page, totalPages, movieType, searchResult } = useSelector((state) => state.movies);
  const [currentPage, setCurrentPage] = useState(page);
  const mainRef = useRef();
  const bottomLineRef = useRef();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    async function fetchMovieData() {
      try {
        const newPayload = setResponsePageNumber(currentPage, totalPages);
        dispatch(dispatchAction(RESPONSE_PAGE, newPayload));
      } catch (error) {
        if (error.response) {
          dispatch(dispatchAction(SET_ERROR, error.response.data.message));
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

  const onClickChange = () => {
    console.log('1234');
    history.push('/searchResults');
  };

  return (
    <div className="main" style={mainStyles} ref={mainRef} onScroll={() => handleScroll()}>
      {loading ? <Spinner /> : <>{searchResult && searchResult.length === 0 ? <MainContent onClick={onClick} /> : <SearchResult onClick={onClickChange} />}</>}
      <div ref={bottomLineRef}></div>
    </div>
  );
};

Main.propTypes = {
  list: PropTypes.array,
  page: PropTypes.number,
  totalPages: PropTypes.number,
  loadMoreMovies: PropTypes.func,
  setResponsePageNumber: PropTypes.func,
  movieType: PropTypes.string,
  searchResult: PropTypes.array
};

export default Main;
