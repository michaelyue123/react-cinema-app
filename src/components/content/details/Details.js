import React, { useEffect, useState } from 'react';
import Rating from '../rating/Rating';
import './Details.scss';
import Overview from './overview/Overview';
import Crew from './crew/Crew';
import Media from './media/Media';
import Reviews from './reviews/Reviews';
import Tabs from './tabs/Tabs';
import { movieDetails } from '../../../redux/actions/movies.action';
import { pathURL } from '../../../redux/actions/routes.action';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { MOVIE_DETAILS, SET_ERROR, PATH_URL } from '../../../redux/types';
import { IMAGE_URL } from '../../../services/movies.service';
import Spinner from '../../spinner/Spinner';

// dispatch movie action
function dispatchAction(type, payload) {
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
    case PATH_URL:
      return {
        type: PATH_URL,
        payload
      };
    default:
      return payload;
  }
}

const Details = (props) => {
  const movie = useSelector((state) => state.movies.movie);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState();
  const { match } = props;

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const payload = pathURL(match.path, match.url);
        dispatch(dispatchAction(PATH_URL, payload));

        if (movie.length === 0) {
          const res = await movieDetails(id);
          dispatch(dispatchAction(MOVIE_DETAILS, res));
        }
        setDetails(movie[0]);
      } catch (error) {
        if (error.response) {
          const payload = {
            message: error.response.data.message || error.response.data.status_message,
            statusCode: error.response.status
          }
          dispatch(dispatchAction(SET_ERROR, payload));
        }
      }
    };
    fetchMovieDetails();

    // eslint-disable-next-line
  }, [id, movie]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        details && (
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
        )
      )}
    </>
  );
};

Details.propTypes = {
  movies: PropTypes.array,
  movieDetails: PropTypes.func,
  pathURL: PropTypes.func,
  match: PropTypes.object
};

export default Details;
