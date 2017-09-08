import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/root_reducer';

// TODO: remove logger in production

const configureStore = function () {
  return createStore(rootReducer, applyMiddleware(logger, thunk));
};

{/*
const configureStore = function (preloadedState = {}) {
  return createStore(rootReducer, preloadedState, applyMiddleware(logger, thunk));
};*/}

export default configureStore;
