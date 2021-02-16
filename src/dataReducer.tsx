import getData from './api/dataApi';
import {
  getSortData, changeArrow, getPogination, getUsersPortion, serchItem,
} from './functions';
import { InferActionsTypes, BaseThunkType } from './reduxStore';
import { uiType, usersType, valuesType } from './types';

const initialState = {
  link: '' as string ,
  allUsers: [] as Array<usersType> ,
  allUsersCopy: [] as Array<usersType>,
  users: [
    {
      address: {
        streetAddress: '', city: '', state: '', zip: '',
      },
      description: '',
      email: '',
      firstName: '',
      id: null as number | null,
      lastName: '',
      phone: '',
    },
  ] as Array<usersType>,
  userInfo: null as usersType | null,
  ui: {
    column: 'id',
    direction: 'up',
    paginationList: [],
    pageNumber: 1,
    searchString: '',
    isAddUser: false,
    progress: false,
    icon_error: false,
  } as uiType,
};

const dataReducer = (state = initialState, action: actionsTypes): initialStateType => {
  switch (action.type) {
    case 'ADD_DATA': {
      return {
        ...state,
        allUsers: [...action.allUsers],
      };
    }
    case 'ADD_DATA_COPY': {
      return {
        ...state,
        allUsersCopy: [...action.data],
      };
    }
    case 'ADD_SORT_USERS': {
      return {
        ...state,
        users: [...action.users],

      };
    }
    case 'ADD_PERSON': {
      return {
        ...state,
        users: [action.payload, ...state.users],
        allUsers: [action.payload, ...state.allUsers],
        allUsersCopy: [action.payload, ...state.allUsersCopy],
      };
    }
    case 'ADD_PERSON_INFO': {
      return {
        ...state,
        userInfo: action.payload,
      };
    }
    case 'SET_COLUNM': {
      return {
        ...state,
        ui: {
          ...state.ui,
          column: action.column,
        },
      };
    }
    case 'SET_DIRECTIONS': {
      return {
        ...state,
        ui: {
          ...state.ui,
          direction: action.directions,
        },
      };
    }
    case 'SET_PAGINATION_ARRAY': {
      return {
        ...state,
        ui: {
          ...state.ui,
          paginationList: [...action.array],
        },
      };
    }
    case 'SET_PAGE_NUMBER': {
      return {
        ...state,
        ui: {
          ...state.ui,
          pageNumber: action.number,
        },
      };
    }
    case 'SET_SERCH_STRING': {
      return {
        ...state,
        ui: {
          ...state.ui,
          searchString: action.searchString,
        },
      };
    }
    case 'SET_ADD_USER_FLAG': {
      return {
        ...state,
        ui: {
          ...state.ui,
          isAddUser: action.payload,
        },
      };
    }
    case 'SET_LINK': {
      return {
        ...state,
        link: action.link,
      };
    }
    case 'SET_PROGRESS': {
      return {
        ...state,
        ui: {
          ...state.ui,
          progress: action.progress,
        },
        
      };
    }
    case 'SET_ICON_ERROR': {
      return {
        ...state,
        ui: {
          ...state.ui,
          icon_error: action.payload,
        },
      };
    }
    default:
      return state;
  }
};

export const actions = {
  addNewData: (allUsers: Array<usersType>) => ({ type: 'ADD_DATA', allUsers } as const)  ,
  addDataCopy: (data: Array<usersType>) => ({ type: 'ADD_DATA_COPY', data } as const),
  addSortUsers: (users: Array<usersType>) => ({ type: 'ADD_SORT_USERS', users } as const),
  setColumn: (column:string) => ({ type: 'SET_COLUNM', column } as const),
  setDirections: (directions:string) => ({ type: 'SET_DIRECTIONS', directions } as const),
  setPaginationArray: (array: Array<number>) => ({ type: 'SET_PAGINATION_ARRAY', array } as const),
  setPageNumber: (number: number) => ({ type: 'SET_PAGE_NUMBER', number } as const),
  setSearchString: (searchString: string) => ({ type: 'SET_SERCH_STRING', searchString } as const),
  setIsAddUsers: (payload: boolean) => ({ type: 'SET_ADD_USER_FLAG', payload } as const),
  addPerson: (payload:usersType) => ({ type: 'ADD_PERSON', payload } as const),
  addPersonInfo: (payload:usersType |null) => ({ type: 'ADD_PERSON_INFO', payload } as const),
  setLink: (link:string ) => ({ type: 'SET_LINK', link } as const),
  setProgress: (progress: boolean) => ({ type: 'SET_PROGRESS', progress } as const),
  setIconError: (payload: boolean) => ({ type: 'SET_ICON_ERROR', payload } as const),
};

export const getSortDataTc = (column: string, users:Array<usersType>, directions: string, pageNumber: number): thuncTypes =>{ 
  return async (dispatch) => {
  dispatch(actions.setColumn(column));
  dispatch(actions.setDirections(changeArrow(directions)));
  const sortData = getSortData(column, users, directions);
  dispatch(actions.addSortUsers(getUsersPortion(sortData, pageNumber)));
  dispatch(actions.setPaginationArray(getPogination(sortData)));
  dispatch(actions.addNewData(sortData));
  dispatch(actions.setPageNumber(pageNumber));
}};

export const getDataTc = (link:string):thuncTypes => {
  return async (dispatch) => {
  dispatch(actions.setProgress(true));
  getData(link)
    .then((data) => {
      dispatch(actions.addDataCopy(data));
      dispatch(getSortDataTc('id', data, 'up', 1));
      dispatch(actions.setProgress(false));
    });
}};

export const setSerchUsersTc = (values:valuesType, allUsersCopy:Array<usersType>): thuncTypes =>{ 
  return async (dispatch) => {
  const users = serchItem(values, allUsersCopy);
  dispatch(getSortDataTc('id', users, 'up', 1));
  dispatch(actions.setSearchString(values.sortString));
  if (users.length < 1) {
    dispatch(actions.setIconError(true));
  } else {
    dispatch(actions.setIconError(false));
  }
}};

export const addPersonTc = (person:usersType): thuncTypes =>{ 
  return async (dispatch) => {
  dispatch(actions.addPerson(person));
};}

export default dataReducer;

type initialStateType = typeof initialState
type actionsTypes = InferActionsTypes<typeof actions>
type thuncTypes = BaseThunkType<actionsTypes>
