import React, { useState, useEffect } from 'react';
import Grid from '../grid/Grid';
import Paginate from '../paginate/Paginate';
import SlideShow from '../slide-show/SlideShow';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { IMAGE_URL } from '../../../services/movies.service';
import { getMovieData, setResponsePageNumber } from '../../../redux/actions/movies.action';
import './MainContent.scss';
import { MOVIE_LIST, RESPONSE_PAGE, SET_ERROR } from '../../../redux/types';

// dispatch movie action
function dispatchAction(type, payload) {
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
    default:
      return payload;
  }
}

const MainContent = () => {
  const { list, page, totalPages, movieType } = useSelector((state) => state.movies);
  const [currentPage, setCurrentPage] = useState(page);
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();
  let randomMovies;

  if (list) {
    randomMovies = list.sort(() => Math.random() - Math.random()).slice(0, 4);
  }

  const HEADER_TYPE = {
    now_playing: 'Now Playing',
    popular: 'Popular',
    top_rated: 'Top Rated',
    upcoming: 'Upcoming'
  };

  useEffect(() => {
    if (randomMovies.length) {
      const IMAGES = [
        {
          id: 1,
          url: `${IMAGE_URL}${randomMovies[0].backdrop_path}`
        },
        {
          id: 2,
          url: `${IMAGE_URL}${randomMovies[1].backdrop_path}`
        },
        {
          id: 3,
          url: `${IMAGE_URL}${randomMovies[2].backdrop_path}`
        },
        {
          id: 4,
          url: `${IMAGE_URL}${randomMovies[3].backdrop_path}`
        }
      ];
      setImages(IMAGES);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setCurrentPage(page);
    // eslint-disable-next-line
  }, [page, totalPages]);

  const paginate = async (type) => {
    let pageNumber = currentPage;
    if (type === 'prev' && currentPage >= 1) {
      pageNumber -= 1;
    } else {
      pageNumber += 1;
    }
    setCurrentPage(pageNumber);
    try {
      const newPayload = setResponsePageNumber(pageNumber, totalPages);
      dispatch(dispatchAction(RESPONSE_PAGE, newPayload));

      const payload = await getMovieData(movieType, pageNumber);
      console.log(payload);
      dispatch(dispatchAction(MOVIE_LIST, payload.results));
    } catch (error) {
      if (error.response) {
        const payload = {
          message: error.response.data.message || error.response.data.status_message,
          statusCode: error.response.status
        };
        dispatch(dispatchAction(SET_ERROR, payload));
      }
    }
  };

  return (
    <div className="main-content">
      <SlideShow images={images} />
      <div className="grid-movie-title">
        <div className="movieType">{HEADER_TYPE[movieType]}</div>
        <div className="paginate">
          <Paginate currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
        </div>
      </div>
      <Grid />
    </div>
  );
};

MainContent.propTypes = {
  list: PropTypes.array,
  movieType: PropTypes.string,
  totalPages: PropTypes.number,
  page: PropTypes.number,
  getMovieData: PropTypes.func,
  setResponsePageNumber: PropTypes.func
};

export default MainContent;
