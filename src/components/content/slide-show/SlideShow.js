import React, { useState, useEffect } from 'react';
import './SlideShow.scss';
import PropTypes from 'prop-types';

const SlideShow = (props) => {
  const { images, isHover } = props;

  const [state, setState] = useState({
    slideShow: images[0],
    slideIndex: 0
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderInterval, setSliderInterval] = useState(0);

  const { slideShow, slideIndex } = state;
  let currentSlideIndex = 0;

  useEffect(() => {
    const timeInterval = setInterval(() => {
      autoMoveSlide();
    }, 3000);

    setSliderInterval(timeInterval);

    return () => {
      clearInterval(timeInterval);
      clearInterval(sliderInterval);
    };

    // eslint-disable-next-line
  }, []);

  const autoMoveSlide = () => {
    let lastIndex = 0;
    lastIndex = currentSlideIndex + 1;
    currentSlideIndex = lastIndex >= images.length ? 0 : lastIndex;

    setState((prev) => ({
      ...prev,
      slideShow: images[currentSlideIndex],
      slideIndex: currentSlideIndex
    }));
  };

  const moveSlideWithArrows = (type) => {
    let index = currentIndex;
    if (type === 'prev') {
      if (currentIndex <= 0) {
        index = images.length - 1;
      } else {
        index -= 1;
      }
    } else {
      if (currentIndex < images.length - 1) {
        index += 1;
      }
      if (currentIndex === images.length - 1) {
        index = 0;
      }
    }
    setCurrentIndex(index);
    setState((prev) => ({
      ...prev,
      slideShow: images[index],
      slideIndex: index
    }));
  };

  const RenderArrows = () => {
    return (
      <div className="slider-arrows">
        <div className="slider-arrow slider-arrow--left" onClick={() => moveSlideWithArrows('prev')}></div>
        <div className="slider-arrow slider-arrow--right" onClick={() => moveSlideWithArrows('next')}></div>
      </div>
    );
  };

  const Indicators = (props) => {
    const { currentSlide } = props;
    const listIndicators = images.map((slide, index) => {
      const buttonClasses = index === currentSlide ? 'slider-navButton slider-navButton--active' : 'slider-navButton';
      return <button className={buttonClasses} key={index} />;
    });

    return <div className="slider-nav">{listIndicators}</div>;
  };

  return (
    <>
      <div className="slider">
        <div className="slider-slides">{images && images.length && slideShow && <div className="slider-image" style={{ backgroundImage: `url(${slideShow.url})` }}></div>}</div>
        <Indicators currentSlide={slideIndex} />
        {isHover ? <RenderArrows /> : null}
      </div>
    </>
  );
};

SlideShow.propTypes = {
  images: PropTypes.array.isRequired,
  currentSlide: PropTypes.number
};

export default SlideShow;
