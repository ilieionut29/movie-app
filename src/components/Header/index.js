import React from 'react';

import logo from '../../web/assets/logo.webp';
import style from './style.module.scss';

class Header extends React.Component {
  render() {
    return (
      <div className={style.header}>
        <div className={style.header_box}>
          <div className={style.header_left}>
            <img src={logo} alt='mobiebox_logo' width={40} height={40} />
            <span>MovieBox</span>
          </div>
          <div className={style.header_right}>
            <a href='/'>Conditions of Use</a>
            <a href='/'>Privacy & Policy</a>
            <a href='/'>Press Room</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
