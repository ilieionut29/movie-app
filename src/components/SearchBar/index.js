import React from 'react';
import { BiSearchAlt } from 'react-icons/bi';

import style from './style.module.scss';

class MovieSearch extends React.Component {
  render() {
    return (
      <div className={style.search}>
        <div className={style.search_box}>
          <input
            type='text'
            placeholder='What do you want to search?'
            value={this.props.searchQuery}
            onChange={this.props.handleSearch}
          />
          <BiSearchAlt />
        </div>
      </div>
    );
  }
}

export default MovieSearch;
