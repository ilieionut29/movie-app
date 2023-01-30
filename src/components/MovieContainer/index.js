import React from 'react';
import { MdFavorite, MdOutlineFavoriteBorder } from 'react-icons/md';

import style from './style.module.scss';

class MovieContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      API_IMG: 'https://image.tmdb.org/t/p/w500/',
    };
  }

  render() {
    const { movie, handleAddToFavorites, handleRemoveFromFavorites } = this.props;
    const isMovieInFavorites = this.props.favorites.find(
      (favorite) => favorite.id === movie.id
    );

    return (
      <>
        <li className={style.box}>
          <div className={style.image_box}>
            <div className={style.favorite}>
              {isMovieInFavorites ? (
                <MdFavorite 
                  onClick={() => handleRemoveFromFavorites(movie)}
                />
              ) : (
                <MdOutlineFavoriteBorder
                  onClick={() => handleAddToFavorites(movie)}
                />
              )}
            </div>
            <img
              alt={movie.title}
              className={style.image}
              src={this.state.API_IMG + movie.poster_path}
            />
          </div>
          <div className={style.info}>
            <div className={style.info_date}>
              {movie.original_language},{' '}
              {movie.release_date
                ? movie.release_date.substring(0, 4)
                : movie.first_air_date.substring(0, 4)}
            </div>
            <div className={style.info_rate}>
              <div className={style.imdb}>IMDb</div>
              {movie.vote_average.toFixed(1)} / 10
            </div>
          </div>
          <h3 className={style.name}>{movie.title || movie.name}</h3>
        </li>
      </>
    );
  }
}

export default MovieContainer;
