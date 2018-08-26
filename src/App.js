import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchInfo from './components/SearchInfo';
import { Provider } from 'react-redux';

import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <SearchInfo />
        </div>
      </Provider>
    );
  }
}

export default App;
