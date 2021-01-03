import React, { useEffect } from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Proptypes from 'prop-types';
import { useDispatch } from 'react-redux';

import Header from './components/header/Header';
import Main from './components/main/Main';
import Details from './components/content/details/Details';
import ErrorBoundary from './components/error/ErrorBoundary';
import { appRoutes } from './redux/actions/routes.action';
import { APP_ROUTES, SET_ERROR } from './redux/types';

// dispatch route action
function dispatchRouteAction(type, payload) {
  switch (type) {
    case APP_ROUTES:
      return {
        type: APP_ROUTES,
        payload
      };
    case SET_ERROR:
      return {
        type: SET_ERROR,
        payload
      };
    default:
      return payload;
  }
}

const App = (props) => {
  const routesArray = [
    {
      id: 1,
      path: '/',
      component: Main
    },
    {
      id: 2,
      path: '/:id/:name/details',
      component: Details
    }
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    const routesAction = async () => {
      const payload = await appRoutes(routesArray);
      dispatch(dispatchRouteAction(APP_ROUTES, payload));
    };

    routesAction();
    // eslint-disable-next-line
  }, [routesArray, appRoutes]);

  return (
    <Router>
      <ErrorBoundary>
        <Header />
      </ErrorBoundary>
      <div className="app">
        <Switch>
          {routesArray.map((data) => (
            <Route key={data.id} exact path={data.path} component={data.component} {...props} />
          ))}
        </Switch>
      </div>
    </Router>
  );
};

App.propTypes = {
  routesArray: Proptypes.array
};

export default App;
