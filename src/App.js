import React from 'react';
import Header from './components/Header';
import MovieList from './components/MovieList';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './web/css/style.scss';
class App extends React.Component {
  render() {
    return (
      <>
        <ToastContainer />
        <Header />
        <MovieList />
      </>
    );
  }
}

export default App;
