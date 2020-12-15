import React, { useState, useEffect } from 'react';
import Rating from '../rating/Rating';
import { useSelector } from 'react-redux';
import './Grid.scss';

const Grid = ({  }) => {
  const list = useSelector(state => state.movies.list);
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    setMovieData(list);
  }, [])

  return (
    <>
      <div className="grid">
        {images.map((image, index) => (
          <div key={index}>
            <div className="grid-cell" style={{ backgroundImage: `url(${image.url})` }}>
              <div className="grid-read-more">
                <button className="grid-cell-button">Read More</button>
              </div>
              <div className="grid-detail">
                <span className="grid-detail-title">Mission Impossible</span>
                <div className="grid-detail-rating">
                  <Rating rating={image.rating} totalStars={10} />
                  &nbsp;&nbsp;
                  <div className="grid-vote-average">{image.rating}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Grid;
