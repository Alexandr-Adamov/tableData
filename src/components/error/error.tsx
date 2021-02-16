import React from 'react';
import iconError from './icon/nothing-found (1).png';
import s from './error.module.css';

const Error = () => (
  <div>
    <div className={s.error_icon_block}><img alt="" src={iconError} className={s.error_icon} /></div>
    <div className={s.error_text}>Нет данных удовлетворяющих условиям поиска</div>

  </div>
);

export default Error;
