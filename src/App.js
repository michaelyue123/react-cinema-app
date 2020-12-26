import React, { useState } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import './App.scss';
import Header from './components/header/Header';
import Main from './components/main/Main';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Details from './components/content/details/Details';
import SearchResult from './components/content/search-result/SearchResult';

const App = () => {
  const [disableSearch, setDisableSearch] = useState(false);

  const onClickChange = () => {
    setDisableSearch(!disableSearch);
  };

  return (
    <Provider store={store}>
      <Router>
        <Header disableSearch={disableSearch} onClick={onClickChange} />
        <div className="app">
          <Switch>
            <Route exact path="/main" render={(props) => <Main {...props} onClick={onClickChange} />} />
            <Route exact path="/:id/:name/details" component={Details} />
            <Route exact path="/searchResults" component={SearchResult} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
