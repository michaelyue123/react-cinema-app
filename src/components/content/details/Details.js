import React, { useEffect, useState } from 'react';
import Rating from '../rating/Rating';
import './Details.scss';
import Overview from './overview/Overview';
import Crew from './crew/Crew';
import Media from './media/Media';
import Reviews from './reviews/Reviews';
import Tabs from './tabs/Tabs';
import { movieDetails } from '../../../redux/actions/movies.action';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { MOVIE_DETAILS, SET_ERROR } from '../../../redux/types';
import { IMAGE_URL } from '../../../services/movies.service';

// dispatch movie action
function dispatchMovieAction(type, payload) {
  switch (type) {
    case MOVIE_DETAILS:
      return {
        type: MOVIE_DETAILS,
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

const Details = () => {
  const movie = useSelector((state) => state.movies.movie);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [details, setDetails] = useState();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        if (movie.length === 0) {
          const res = await movieDetails(id);
          dispatch(dispatchMovieAction(MOVIE_DETAILS, res));
        }
        setDetails(movie[0]);
      } catch (error) {
        if (error.response) {
          dispatch(dispatchMovieAction(SET_ERROR, error.response.data.message));
        }
      }
    };
    fetchMovieDetails();

    // eslint-disable-next-line
  }, [id, movie]);

  return (
    <>
      {details && (
        <div className="movie-container">
          <div className="movie-bg" style={{ backgroundImage: `url(${IMAGE_URL}${details.backdrop_path})` }}></div>
          <div className="movie-overlay"></div>
          <div className="movie-details">
            <div className="movie-image">
              <img src={`${IMAGE_URL}${details.poster_path}`} alt="" />
            </div>
            <div className="movie-body">
              <div className="movie-overview">
                <div className="title">
                  {details.title} <span>{details.release_date}</span>
                </div>
                <div className="movie-genres">
                  <ul className="genres">{details && details.genres.map((genre) => <li key={genre.id}>{genre.name}</li>)}</ul>
                </div>
                <div className="rating">
                  <Rating className="rating-stars" rating={details.vote_average} totalStars={10} />
                  &nbsp;
                  <span>{details.vote_average}</span> <p>({details.vote_count}) votes</p>
                </div>
                <Tabs>
                  <div label="Overview">
                    <Overview />
                  </div>
                  <div label="Crew">
                    <Crew />
                  </div>
                  <div label="Media">
                    <Media />
                  </div>
                  <div label="Reviews">
                    <Reviews />
                  </div>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

Details.propTypes = {
  movies: PropTypes.array,
  movieDetails: PropTypes.func
};

export default Details;
