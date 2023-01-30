import React from 'react';
import MovieContainer from '../MovieContainer';
import SearchBar from '../SearchBar';
import MenuBar from '../MenuBar';
import Loading from '../Loading';
import Pager from '../Pager';
import { toast } from 'react-toastify';

import style from './style.module.scss';

class MovieList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      initialPage: 1,
      type: 'popular',
      API_IMG: 'https://image.tmdb.org/t/p/w500/',
      searchQuery: '',
      favorites: [],
      showFavorites: false,
    };
  }

  addToFavorites = (movie) => {
    this.setState((prevState) => ({
      favorites: [...prevState.favorites, movie],
    }));

    toast.success(`${movie.title} has been added to favorites!`, {
      position: 'bottom-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  removeFromFavorites = (movie) => {
    const favorites = [...this.state.favorites];
    const index = favorites.findIndex((f) => f.id === movie.id);
    if (index === -1) {
      return;
    }
    favorites.splice(index, 1);
    this.setState({ favorites });
    toast.error(`${movie.title} has been removed from favorites!`, {
      position: 'bottom-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  handleTypeChange = (selectedType) => {
    this.setState({ type: selectedType });
    this.setState({ initialPage: 1 });
  };

  handleSearch = (e) => {
    this.setState({ searchQuery: e.target.value });
  };

  handleNextPage = () => {
    if (this.state.initialPage < 7) {
      this.setState(
        (prevState) => ({
          initialPage: prevState.initialPage + 1,
        }),
        () => {
          this.fetchMovies(this.state.type);
        }
      );
    }
  };

  handlePrevPage = () => {
    if (this.state.initialPage > 1) {
      this.setState(
        (prevState) => ({
          initialPage: prevState.initialPage - 1,
        }),
        () => {
          this.fetchMovies(this.state.type);
        }
      );
    }
  };

  fetchMovies = (type) => {
    if (type === 'favorites') {
      this.setState({ showFavorites: true });
    } else {
      this.setState({ showFavorites: false });
      const API = 'https://api.themoviedb.org/3/movie';
      const API_KEY = '50fbc1329ab1e0bc17ffaf32ac34fa4a';
      const PAGE = this.state.initialPage;

      fetch(`${API}/${type}?api_key=${API_KEY}&page=${PAGE}`)
        .then((response) => response.json())
        .then((data) => {
          this.setState({ movies: data.results });
        })
        .catch((error) => {
          console.error('fetchMoviesERROR', error);
        });
    }
  };

  componentDidMount() {
    this.fetchMovies(this.state.type);
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    this.setState({ favorites: favorites });
  }

  componentDidUpdate(prevState) {
    if (prevState.favorites !== this.state.favorites) {
      localStorage.setItem('favorites', JSON.stringify(this.state.favorites));
    }
  }

  render() {
    const filteredMovies = this.state.movies
      ? this.state.movies.filter((movie) => {
          return movie.title
            .toLowerCase()
            .includes(this.state.searchQuery.toLowerCase());
        })
      : [];

    return (
      <>
        <MenuBar
          type={this.state.type}
          fetchMovies={this.fetchMovies}
          onTypeChange={this.handleTypeChange}
          toggleShowFavorites={this.toggleShowFavorites}
          favoriteLength={this.state.favorites.length}
        />

        <SearchBar
          searchQuery={this.state.searchQuery}
          handleSearch={this.handleSearch}
        />

        {this.state.showFavorites ? (
          <>
            {this.state.favorites.length > 0 ? (
              <ul className={style.movie_list}>
                {this.state.favorites.map((movie) => {
                  return (
                    <MovieContainer
                      key={movie.id}
                      movie={movie}
                      handleAddToFavorites={this.addToFavorites}
                      favorites={this.state.favorites}
                      handleRemoveFromFavorites={this.removeFromFavorites}
                    />
                  );
                })}
              </ul>
            ) : (
              <span className={style.empty}>
                It seems that your favorites list is currently empty. Please add
                some movies to your favorites list by clicking the heart icon on
                any movie.
              </span>
            )}
          </>
        ) : (
          <>
            {this.state.movies.length > 0 ? (
              <>
                {filteredMovies.length > 0 ? (
                  <>
                    <ul className={style.movie_list}>
                      {filteredMovies.map((movie) => {
                        return (
                          <MovieContainer
                            key={movie.id}
                            movie={movie}
                            handleAddToFavorites={this.addToFavorites}
                            favorites={this.state.favorites}
                            handleRemoveFromFavorites={this.removeFromFavorites}
                          />
                        );
                      })}
                    </ul>
                    <Pager
                      handlePrevPage={this.handlePrevPage}
                      handleNextPage={this.handleNextPage}
                    />
                  </>
                ) : (
                  <span className={style.empty}>
                    Sorry, no movies were found for the title you entered.
                    Please try again with a different movie title.
                  </span>
                )}
              </>
            ) : (
              <Loading />
            )}
          </>
        )}
      </>
    );
  }
}

export default MovieList;
