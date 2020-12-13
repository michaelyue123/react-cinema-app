import React, { useState, useEffect, Fragment, useRef } from 'react';
import './Rating.scss';
import PropTypes from 'prop-types';

const Rating = ({ rating, totalStars, className }) => {
  const [numberOfStars, setNumberOfStarts] = useState();
  const ratingRef = useRef();

  useEffect(() => {
    const starsArray = [...Array(totalStars).keys()].map((index) => index + 1);
    setNumberOfStarts(starsArray);
    let percentage;
    if (rating <= 5) {
      percentage = (rating / 5) * 100;
    } else {
      percentage = (rating / 10) * 100;
    }
    const starPercentage = `${Math.floor(percentage)}%`;
    ratingRef.current.style.width = starPercentage;
  }, [rating, totalStars]);

  return (
    <div className="star-rating">
      <div className={`back-stars ${className}`}>
        {numberOfStars &&
          numberOfStars.map((index) => (
            <Fragment key={index}>
              <i className="fa fa-star" aria-hidden="true"></i>
            </Fragment>
          ))}
        <div className={`front-stars ${className}`} ref={ratingRef}>
          {numberOfStars &&
            numberOfStars.map((index) => (
              <Fragment key={index}>
                <i className="fa fa-star" aria-hidden="true"></i>
              </Fragment>
            ))}
        </div>
      </div>
    </div>
  );
};

Rating.propTypes = {
  rating: PropTypes.number.isRequired,
  totalStars: PropTypes.number.isRequired,
  className: PropTypes.string
};

export default Rating;
