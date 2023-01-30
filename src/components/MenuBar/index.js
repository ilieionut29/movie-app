import React from 'react';

import style from './style.module.scss';

class MenuBar extends React.Component {
  handleTypeChange = (selectedType) => {
    this.props.fetchMovies(selectedType);
    this.props.onTypeChange(selectedType);
  };

  render() {
    return (
      <div className={style.menu}>
        <div className={style.left}>
          <button
            className={this.props.type === 'popular' ? style.active : ''}
            onClick={() => this.handleTypeChange('popular')}
          >
            Popularity
          </button>
          <button
            className={this.props.type === 'top_rated' ? style.active : ''}
            onClick={() => this.handleTypeChange('top_rated')}
          >
            Top Rated
          </button>
          <button
            className={this.props.type === 'upcoming' ? style.active : ''}
            onClick={() => this.handleTypeChange('upcoming')}
          >
            Upcoming
          </button>
        </div>
        <div className={style.right}>
          <button
            className={this.props.type === 'favorites' ? style.active : ''}
            onClick={() => this.handleTypeChange('favorites')}
          >
            Favorites ({this.props.favoriteLength || '0'})
          </button>
        </div>
      </div>
    );
  }
}

export default MenuBar;
