import { appStateType } from "./reduxStore";

export const getPageNumber = (state: appStateType) => state.dataReducer.ui.pageNumber;
export const getUsers = (state: appStateType) => state.dataReducer.users;
export const getAllUsers = (state: appStateType) => state.dataReducer.allUsers;
export const getDirection = (state: appStateType) => state.dataReducer.ui.direction;
export const getColumn = (state: appStateType) => state.dataReducer.ui.column;
export const getPaginationList = (state: appStateType) => state.dataReducer.ui.paginationList;
export const getallUsersCopy = (state: appStateType) => state.dataReducer.allUsersCopy;
export const getSearchString = (state: appStateType) => state.dataReducer.ui.searchString;
export const getIsAddUser = (state: appStateType) => state.dataReducer.ui.isAddUser;
export const getPersonAdress = (state: appStateType) => state.dataReducer.userInfo;
export const getLink = (state: appStateType) => state.dataReducer.link;
export const getProgress = (state: appStateType) => state.dataReducer.ui.progress;
export const getIconStatus = (state: appStateType) => state.dataReducer.ui.icon_error;
