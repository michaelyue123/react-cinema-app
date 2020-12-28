import React, { useState, useEffect } from 'react';
import './Paginate.scss';
import PropTypes from 'prop-types';

const Paginate = (props) => {
  const { currentPage, totalPages, paginate } = props;
  const [page, setPage] = useState(1);
  const [totalPageNumber, setTotalPageNumber] = useState(1);

  useEffect(() => {
    setPage(currentPage);
    setTotalPageNumber(totalPages);
  }, [currentPage, totalPages]);

  return (
    <>
      <span className="pageCount">
        {page} - {totalPageNumber}
      </span>
      <button className={`${page === 1 ? 'paginate-button disable' : 'paginate-button'}`} onClick={() => paginate('prev')}>
        Prev
      </button>
      <button className={`${page === totalPageNumber ? 'paginate-button disable' : 'paginate-button'}`} onClick={() => paginate('next')}>
        Next
      </button>
    </>
  );
};

// type validation
Paginate.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired
};

export default Paginate;
