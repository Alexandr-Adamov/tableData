import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getDataTc, getSortDataTc, setSerchUsersTc, actions, addPersonTc,
} from '../../dataReducer';
import Table from './table/table';
import {
  getPageNumber,
  getUsers,
  getAllUsers,
  getDirection,
  getColumn,
  getPaginationList,
  getallUsersCopy,
  getIsAddUser,
  getPersonAdress,
  getLink,
  getProgress,
  getIconStatus,
} from '../../selectors';
import { usersType, valuesType } from '../../types';

const AllDataContainer: React.FC = () => {
  const dispatch = useDispatch();
  const pageNumber = useSelector(getPageNumber);
  const users = useSelector(getUsers);
  const allUsers = useSelector(getAllUsers);
  const direction = useSelector(getDirection);
  const column = useSelector(getColumn);
  const paginationList = useSelector(getPaginationList);
  const allUsersCopy = useSelector(getallUsersCopy);
  const isAddUser = useSelector(getIsAddUser);
  const person = useSelector(getPersonAdress);
  const link = useSelector(getLink);
  const progress = useSelector(getProgress);
  const iconError = useSelector(getIconStatus);

  useEffect(() => {
    dispatch(getDataTc(link));
  }, [ dispatch,link]);

  const prevColumn = column;
  const handleClick = (propsColumn :string) => {
    if (propsColumn === prevColumn) {
      dispatch(getSortDataTc(propsColumn, allUsers, direction, pageNumber));
    } else {
      dispatch(getSortDataTc(propsColumn, allUsers, 'up', pageNumber));
    }
  };

  const chengePage = (propsPageNumber :number) => {
    if (column === prevColumn) {
      dispatch(getSortDataTc(column, allUsers, 'up', propsPageNumber));
    } else {
      dispatch(getSortDataTc(column, allUsers, direction, propsPageNumber));
    }
  };

  const setSerchUsers = (values: valuesType) => dispatch(setSerchUsersTc(values, allUsersCopy));
  const addPerson = (propsPerson: usersType) => dispatch(addPersonTc(propsPerson));

  const showForm = (button :string, e:any, flag: boolean) => {
    if (button === 'add') {
      e.currentTarget.parentElement.style.width = '100%';
    } if (button === 'close') {
      e.target.parentElement.parentElement.style.width = '0%';
    }
    dispatch(actions.setIsAddUsers(flag));
  };

  const showPerson = (propsPerson:usersType | null ) => {
    dispatch(actions.addPersonInfo(propsPerson));
  };

  const setLink = (propsLink: string) => {
    dispatch(actions.setLink(propsLink));
  };

  return (
    <Table
      pageNumber={pageNumber}
      paginationList={paginationList}
      users={users}
      column={column}
      direction={direction}
      isAddUser={isAddUser}
      person={person}
      progress={progress}
      iconError={iconError}
      handleClick={handleClick}
      chengePage={chengePage}
      setSerchUsers={setSerchUsers}
      showForm={showForm}
      addPerson={addPerson}
      showPerson={showPerson}
      link={link}
      setLink={setLink}
    />
  );
};

export default AllDataContainer;
