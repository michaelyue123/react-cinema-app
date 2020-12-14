import React, { useState, useEffect } from 'react';
import Grid from '../grid/Grid';
import Paginate from '../paginate/Paginate';
import SlideShow from '../slide-show/SlideShow';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { IMAGE_URL } from '../../../services/movies.service';
import './MainContent.scss';

const MainContent = () => {
  const [isHover, setIsHover] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const list = useSelector(state => state.movies.list);
  const [ images, setImages ] = useState([]);
  let randomMovies;

  if(list) {
    randomMovies = list.sort(() => Math.random() - Math.random()).slice(0,4);
  }

  useEffect(() => {
    if(randomMovies.length) {
      const IMAGES = [
        {
          id: list[0].id,
          url: `${IMAGE_URL}/${randomMovies[0].backdrop_path}`,
          rating: list[0].vote_average,
          title: list[0].title
        },
        {
          id: list[1].id,
          url: `${IMAGE_URL}/${randomMovies[1].backdrop_path}`,
          rating: list[1].vote_average,
          title: list[1].title
        },
        {
          id: list[2].id,
          url: `${IMAGE_URL}/${randomMovies[2].backdrop_path}`,
          rating: list[2].vote_average,
          title: list[2].title
        },
        {
          id: list[3].id,
          url: `${IMAGE_URL}/${randomMovies[3].backdrop_path}`,
          rating: list[3].vote_average,
          title: list[3].title
        }
      ];
      setImages(IMAGES);
    }

    // eslint-disable-next-line
  }, [])


  const paginate = (type) => {
    if (type === 'prev' && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div className="main-content">
      <div onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
        <SlideShow images={images} isHover={isHover} />
      </div>
      <div className="grid-movie-title">
        <div className="movieType">Now Playing</div>
        <div className="paginate">
          <Paginate currentPage={currentPage} totalPages={10} paginate={paginate} />
        </div>
      </div>
      <Grid />
    </div>
  );
};

MainContent.propTypes = {
  list: PropTypes.array
}

export default MainContent;
