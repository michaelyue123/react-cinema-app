import React, { useState, useEffect } from 'react';
import Rating from '../rating/Rating';
import { useSelector } from 'react-redux';
import './Grid.scss';
import { v4 as uuidv4 } from 'uuid';
import { IMAGE_URL } from '../../../services/movies.service';
import PropTypes from 'prop-types';
import LazyImage from '../../lazy-image/LazyImage';
import { Link } from 'react-router-dom';

const Grid = () => {
  const list = useSelector((state) => state.movies.list);
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    setMovieData(list);
  }, [list]);

  const formatMovieTitle = (title) => {
    const titleStr = title.toLowerCase();
    return titleStr.replace(/ /g, '-');
  };

  return (
    <>
      <div className="grid">
        {movieData &&
          movieData.map((image) => (
            <div key={uuidv4()}>
              <LazyImage className="grid-cell" alt="placeholder" src={`${IMAGE_URL}${image.poster_path}`}>
                <div className="grid-read-more">
                  <button className="grid-cell-button">
                    <Link to={`/${image.id}/${formatMovieTitle(image.title)}/details`}>Read More</Link>
                  </button>
                </div>
                <div className="grid-detail">
                  <span className="grid-detail-title">{image.title}</span>
                  <div className="grid-detail-rating">
                    <Rating rating={image.vote_average} totalStars={10} />
                    &nbsp;&nbsp;
                    <div className="grid-vote-average">{image.vote_average}</div>
                  </div>
                </div>
              </LazyImage>
            </div>
          ))}
      </div>
    </>
  );
};

Grid.propTypes = {
  list: PropTypes.array
};

export default Grid;
