import { createStore, applyMiddleware, combineReducers } from 'redux';
import createLogger from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk
import { composeWithDevTools } from 'redux-devtools-extension';

import students from './store/students';
import campuses from './store/campuses';
import selectors from './store/selectors';
import inputFields from './store/inputFields';

const reducer = combineReducers({
  students,
  campuses,
  selectors
});


export default createStore(reducer, composeWithDevTools(applyMiddleware(thunkMiddleware, createLogger())))


export * from './store/students';
export * from './store/campuses';
export * from './store/selectors';
export * from './store/inputFields';
