import React from 'react';
import { GrLinkNext, GrLinkPrevious } from 'react-icons/gr';
import style from './style.module.scss';

class Pager extends React.Component {
  render() {
    const { handlePrevPage, handleNextPage } = this.props;
    return (
      <>
        <div className={style.pager}>
          <button onClick={handlePrevPage}>
            <GrLinkPrevious /> Previous page
          </button>
          <button onClick={handleNextPage}>
            Next page <GrLinkNext />
          </button>
        </div>
      </>
    );
  }
}

export default Pager;
