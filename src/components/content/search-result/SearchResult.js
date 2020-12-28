import React, { useState, useEffect, Fragment } from 'react';
import Rating from '../rating/Rating';
import './SearchResult.scss';
import '../grid/Grid.scss';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
import { IMAGE_URL } from '../../../services/movies.service';
import PropTypes from 'prop-types';
import LazyImage from '../../lazy-image/LazyImage';
import { Link } from 'react-router-dom';

const SearchResult = () => {
  const [movieData, setMovieData] = useState([]);
  const { searchQuery, searchResult } = useSelector((state) => state.movies);

  useEffect(() => {
    setMovieData(searchResult);
  }, [searchResult]);

  const formatMovieTitle = (title) => {
    const titleStr = title.toLowerCase();
    return titleStr.replace(/ /g, '-');
  };

  return (
    <div className="searchKeyword">
      <div className="grid-search-title">
        <span className="grid-text1">Your search keyword:</span> <span className="grid-text2">{searchQuery}</span>
      </div>
      <div className="grid">
        {movieData &&
          movieData.map((image) => (
            <Fragment key={uuidv4()}>
              {image.poster_path && (
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
              )}
            </Fragment>
          ))}
      </div>
    </div>
  );
};

SearchResult.propTypes = {
  list: PropTypes.array,
  searchQuery: PropTypes.string,
  searchResult: PropTypes.array
};

export default SearchResult;
