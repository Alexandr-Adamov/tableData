import React from 'react';
import { usersType } from '../../../../types';
import s from './adress.module.css';


type propsType = {
  person: usersType
  showPerson: (arg: null | usersType ) => void
}

const Adress: React.FC<propsType> = (props) => {
  const { person, showPerson } = props;
  const {
    firstName, address, description, lastName,
  } = person;
  return (
    <div>
      <span>
        Выбран пользователь:
        <span className={s.desc}>
          {' '}
          {firstName}
          {' '}
          {lastName}
        </span>
      </span>
      <div className={s.textarea}>
        Описание:
        <textarea className={s.data_textarea} onChange={() => { }} value={description} />
      </div>
      <div>
        Адрес проживания:
        <span className={s.desc}>{address.streetAddress}</span>
      </div>
      <div>
        Город:
        <span className={s.desc}>{address.city}</span>
      </div>
      <div>
        Провинция/штат:
        <span className={s.desc}>{address.state}</span>
      </div>
      <div className={s.button}>
        <div>
          Индекс:
          <span className={s.desc}>{address.zip}</span>
        </div>

        <button type="button" onClick={() => { showPerson(null); }} className={s.big}>Закрыть</button>
      </div>
    </div>
  );
};

export default Adress;
