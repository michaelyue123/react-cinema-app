import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setError } from '../../redux/actions/error.action';


import './ErrorPage.scss';
import { SET_ERROR } from '../../redux/types';

const ErrorPage = ({ clearState }) => {
  const history = useHistory();
  const dispatch = useDispatch();


  const navigateToHomePage = () => {
    const payload = setError({ message: '', statusCode: null })
    dispatch({type: SET_ERROR, payload});
    clearState();
    history.push('/');
  }

  return (
    <div className="error-page">
      <h1 className="error-header">Oops!</h1>
      <p className="error-msg">Something went wrong.</p>
      <div className="error-link" onClick={() => navigateToHomePage()}>
        <i className="icon-home"></i> Go back to home page.
      </div>
    </div>
  );
};

ErrorPage.propTypes = {
  clearState: PropTypes.func
}

export default ErrorPage;
