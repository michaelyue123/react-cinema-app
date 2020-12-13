import React, { useState } from 'react';
import SlideShow from '../slide-show/SlideShow';
import './MainContent.scss';

const MainContent = () => {
  const [isHover, setIsHover] = useState(false);

  const images = [
    {
      url: 'https://i.pinimg.com/originals/af/8d/63/af8d63a477078732b79ff9d9fc60873f.jpg'
    },
    {
      url: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg'
    },
    {
      url: 'https://lumiere-a.akamaihd.net/v1/images/sa_pixar_virtualbg_coco_16x9_9ccd7110.jpeg?region=0,0,1920,1080'
    },
    {
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRcBFvwWwx5kb2YQ3-hgYq_LuBMzL_mcm6Ww&usqp=CAU'
    }
  ];

  return (
    <div className="main-content">
      <div onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
        <SlideShow images={images} isHover={isHover} />
      </div>
      <div className="grid-movie-title">
        <div className="movieType">Now Playing</div>
        <div className="paginate">Paginate</div>
      </div>
    </div>
  );
};

export default MainContent;
