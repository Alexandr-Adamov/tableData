import React from 'react';
import { usersType, valuesType } from '../../../types';
import Error from '../../error/error';
import Loader from '../../Loading/loading';
import Adress from './adress/adress';
import Buttons from './buttons/button';
import AddUserForm from './forms/addUserForm/AddUserForm';
import SearchForm from './forms/search/Search-form';
import s from './table.module.css';

type propsType = {
  users: Array<usersType>
  paginationList: Array<number>
  column: string
  direction: string
  pageNumber: number
  isAddUser: boolean
  person: usersType | null
  link: string
  progress: boolean
  iconError: boolean
  handleClick: (column: string) => void
  chengePage: (pageNumber: number) => void
  setSerchUsers: (values: valuesType) => void
  showForm: (button: string, e: any, flag: boolean) => void
  addPerson: (person: usersType) => void
  showPerson: (person: usersType | null) => void
  setLink: (link: string) => void
}


const Table: React.FC<propsType> = (props) => {
  const {
    users,

    column,
    direction,
    paginationList,
    progress,
    iconError,
    person,
    link,
    pageNumber,
    isAddUser,
    setSerchUsers,
    showForm,
    addPerson,
    showPerson,
    chengePage,
    setLink,
    handleClick,

  } = props;

  return (
    <div className={s.container}>

      {!link
        ? <Buttons setLink={setLink} />
        : (
          <div className={s.table_container}>
            <div>
              <SearchForm setSerchUsers={setSerchUsers} />
              <AddUserForm isAddUser={isAddUser} showForm={showForm} addPerson={addPerson} />
              {iconError ? <Error />
                : (
                  <div>
                    <div className={s.table_title}>
                      <div
                        aria-hidden="true"
                        role="button"
                        tabIndex={0}
                        onClick={() => handleClick('id')}
                        className={s.id}
                      >
                        id
                        {column === 'id' ? <span><i className={s[direction]} /></span> : null}
                      </div>
                      <div
                        aria-hidden="true"
                        role="button"
                        tabIndex={0}
                        onClick={() => handleClick('firstName')}
                        className={s.firstName}
                      >
                        firstName
                        {column === 'firstName' ? <span><i className={s[direction]} /></span> : null}
                      </div>
                      <div
                        aria-hidden="true"
                        role="button"
                        tabIndex={0}
                        onClick={() => handleClick('lastName')}
                        className={s.lastName}
                      >
                        lastName
                        {column === 'lastName' ? <span><i className={s[direction]} /></span> : null}
                      </div>
                      <div
                        aria-hidden="true"
                        role="button"
                        tabIndex={0}
                        onClick={() => handleClick('email')}
                        className={s.email}
                      >
                        email
                        {column === 'email' ? <span><i className={s[direction]} /></span> : null}
                      </div>
                      <div
                        aria-hidden="true"
                        role="button"
                        tabIndex={0}
                        onClick={() => handleClick('phone')}
                        className={s.phone}
                      >
                        phone
                        {column === 'phone' ? <span><i className={s[direction]} /></span> : null}
                      </div>
                    </div>
                  </div>
                )}
              {progress
                ? <Loader />
                : (
                  <div>
                    {users.map((user) => (
                      <div
                        aria-hidden="true"
                        role="button"
                        tabIndex={0}
                        onClick={() => { showPerson(user); }}
                        key={user.id + user.phone}
                        className={s.table}
                      >
                        <div className={s.id}>{user.id}</div>
                        <div className={s.firstName}>{user.firstName}</div>
                        <div className={s.lastName}>{user.lastName}</div>
                        <div className={s.email}>{user.email}</div>
                        <div className={s.phone}>{user.phone}</div>
                      </div>
                    ))}
                  </div>
                )}

            </div>

            {person != null ? <Adress person={person} showPerson={showPerson} /> : null}
            <div className={s.pagination__block}>
              {paginationList.map((item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() => chengePage(item)}
                  className={pageNumber === item ? s.selectedPage : s.selected__no_active}
                >
                  {item}
                </button>
              ))}
            </div>

          </div>
        )}

    </div>

  );
};

export default Table;
