import { usersType, valuesType } from "./types";

export const getSortData = (sortColumn: string, data: Array<usersType>, direction: string) => {
  const sortData = data.sort((a: any, b: any) => {
    if (direction === 'up') {
      if (a[sortColumn] < b[sortColumn]) {
        return -1;
      }
      if (a[sortColumn] > b[sortColumn]) {
        return 1;
      }
    }
    if (direction === 'down') {
      if (a[sortColumn] < b[sortColumn]) {
        return 1;
      }
      if (a[sortColumn] > b[sortColumn]) {
        return -1;
      }
    }
    return 0;
  });
  return sortData;
};

export const changeArrow = (direction: string) => {
  if (direction === 'up') {
    return 'down';
  }
  return 'up';
};

export const getPogination = (users: Array<usersType>) => {
  const items = users.length;
  const totalCount = Math.ceil(items / 50);
  const pages = [];
  for (let i = 1; i <= totalCount; i += 1) {
    pages.push(i);
  }
  return pages;
};

export const getUsersPortion = (users: Array<usersType>, pageNumber: number) => {
  const lefBorder = (pageNumber - 1) * 50;
  const rightBorder = pageNumber * 50 - 1;
  const currentPortion = users.filter((item, index) => index >= lefBorder && index <= rightBorder);
  return currentPortion;
};

export const serchItem = (values: valuesType, allUsersCopy: Array<usersType>) => {
  const str = values.sortString.toLowerCase();
  if (!values.sortString) {
    return allUsersCopy;
  }
  if (!values.column) {
    return allUsersCopy.filter((item) => item
      .firstName.toLowerCase().includes(str.toLowerCase())
      || item.lastName.toLowerCase().includes(str.toLowerCase())
      || item.email.toLowerCase().includes(str.toLowerCase()));
  }

  const sortColumn = values.column;
  return allUsersCopy.filter((item) => (item[sortColumn]).toLowerCase().includes(str));
};
