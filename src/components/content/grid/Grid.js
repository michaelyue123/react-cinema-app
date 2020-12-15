import React, { useState, useEffect } from 'react';
import Rating from '../rating/Rating';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { IMAGE_URL } from '../../../services/movies.service';
import './Grid.scss';
import LazyImage from '../../lazy-image/LazyImage';

const Grid = () => {
  const list = useSelector((state) => state.movies.list);
  // const [movieData, setMovieData] = useState([]);

  // useEffect(() => {
  //   setMovieData(list);
  // }, [list]);

  return (
    <>
      <div className="grid">
        {list &&
          list.map((image) => (
            <div key={uuidv4()}>
              <LazyImage className="grid-cell" alt="placeholder" src={`${IMAGE_URL}${image.poster_path}`}>
                <div className="grid-read-more">
                  <button className="grid-cell-button">Read More</button>
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

export default Grid;
