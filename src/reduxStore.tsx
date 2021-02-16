import {
  combineReducers, createStore, applyMiddleware, Action,
} from 'redux';
import thunkMiddleware, { ThunkAction } from 'redux-thunk';
import dataReducer from './dataReducer';

const reducers = combineReducers({
  dataReducer,
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

// типизация для state
type reducersType = typeof reducers
export type appStateType = ReturnType<reducersType>

// типизация для action creators
type propertiesTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type InferActionsTypes<T extends {
  [key: string]:
  (...args: any[]) => any
}> = ReturnType<propertiesTypes<T>>

// типизация для thunc creators
export type BaseThunkType<A extends Action, R = Promise<void>> =
  ThunkAction<R, appStateType, unknown, A>

// @ts-ignore
window.store = store;

export default store;
