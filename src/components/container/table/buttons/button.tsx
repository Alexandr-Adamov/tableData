import React from 'react';
import s from './buttons.module.css';

type propsType ={
  setLink: (link: string) => void
}

const Buttons: React.FC<propsType> = (props) => {
  const { setLink } = props;
  const little = 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';
  const big = 'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';
  return (
    <div className={s.buttons}>
      <button type="button" className={s.little} onClick={() => { setLink(little); }}> 32 </button>
      <button type="button" className={s.big} onClick={() => { setLink(big); }}> 1000 </button>
    </div>
  );
};

export default Buttons;
