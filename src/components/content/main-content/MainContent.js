import React, { useState } from 'react';
import Grid from '../grid/Grid';
import Paginate from '../paginate/Paginate';
import SlideShow from '../slide-show/SlideShow';
import './MainContent.scss';

const MainContent = () => {
  const [isHover, setIsHover] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const paginate = (type) => {
    if (type === 'prev' && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const images = [
    {
      url: 'https://i.pinimg.com/originals/af/8d/63/af8d63a477078732b79ff9d9fc60873f.jpg',
      rating: 7.5
    },
    {
      url: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
      rating: 9.5
    },
    {
      url: 'https://lumiere-a.akamaihd.net/v1/images/sa_pixar_virtualbg_coco_16x9_9ccd7110.jpeg?region=0,0,1920,1080',
      rating: 8.0
    },
    {
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRcBFvwWwx5kb2YQ3-hgYq_LuBMzL_mcm6Ww&usqp=CAU',
      rating: 6.5
    }
  ];

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
      <Grid images={images} />
    </div>
  );
};

export default MainContent;
