import React, { useState, useEffect, useRef } from 'react';
import MainContent from '../content/main-content/MainContent';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { LOAD_MORE_RESULTS, RESPONSE_PAGE, SET_ERROR } from '../../redux/types';
import { loadMoreMovies, setResponsePageNumber } from '../../redux/actions/movies.action';
import Spinner from '../spinner/Spinner';

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

const Main = () => {
  const mainStyles = {
    textAlign: 'center',
    height: '100vh',
    backgroungColor: '#020e18',
    overflowY: 'scroll'
  };

  const [loading, setLoading] = useState(false);
  const { page, totalPages } = useSelector((state) => state.movies);
  const [currentPage, setCurrentPage] = useState(page);
  const mainRef = useRef();
  const bottomLineRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    async function fetchMovieData() {
      try {
        const newPayload = await setResponsePageNumber(currentPage, totalPages);
        dispatch(dispatchAction(RESPONSE_PAGE, newPayload));

        const response = await loadMoreMovies('now_playing', currentPage);
        const { results, payload } = response;
        dispatch(dispatchAction(LOAD_MORE_RESULTS, results));
        dispatch(dispatchAction(RESPONSE_PAGE, payload));
      } catch (error) {
        if (error.response) {
          dispatch(dispatchAction(SET_ERROR, error.response.data.message));
        }
      }
    }
    fetchMovieData();

    // eslint-disable-next-line
  }, [dispatch, currentPage]);

  const fetchData = () => {
    if (page < totalPages) {
      setCurrentPage((prev) => prev + 1);
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
    <div className="main" style={mainStyles} ref={mainRef} onScroll={() => handleScroll()}>
      {loading ? <Spinner /> : <MainContent />}
      <div ref={bottomLineRef}></div>
    </div>
  );
};

Main.propTypes = {
  list: PropTypes.array,
  page: PropTypes.number,
  totalPages: PropTypes.number,
  loadMoreMovies: PropTypes.func,
  setResponsePageNumber: PropTypes.func
};

export default Main;
