import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import './App.scss';
import Header from './components/header/Header';
import Main from './components/main/Main';

const App = () => {
  return (
    <Provider store={store}>
      <Header />
      <div className="app">
        <Main />
      </div>
    </Provider>
  );
};

export default App;
