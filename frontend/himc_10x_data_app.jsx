// Entry file
import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';

import {fetchAllSamples} from './util/samples_api_util.js';
import * as sampleActions from './actions/samples_actions.js'
window.fetchAllSamples = fetchAllSamples;
window.sampleActions = sampleActions;

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  ReactDOM.render(<h1>welcome!</h1>, root);
});

{/*
  // TODO: Testing Purposes only:
  // SETUP:
  // let store = configureStore();
  // window.getState = store.getState;
  // window.dispatch = store.dispatch;
  // TEST:
  // getState(); // should return initial app state
  //
  // const getSuccess = pokemon => dispatch(sampleActions.receiveSamples(samples));
  // sampleActions.fetchAllSamples().then(getSuccess);
  //
  // getState(); // should return the app state populated with samples

  // TODO: Testing Purposes only:
  // TEST:
  // getState(); // should return initial app state
  // dispatch(requestSamples());
  // getState(); // should return the app state populated with samples

  // TODO: Testing Purposes only:
  // SETUP:
  // import selectAllSamples from './reducers/selectors.js';
  // window.selectAllSamples = selectAllSamples;
  // TEST:
  // const initialState = getState();
  // selectAllSamples(initialState); //=> []
  // dispatch(sampleActions.requestSamples());
  // const populatedState = getState();
  // selectAllSamples(populatedState); //=> array of sample objects!

  */}




{/*
// TODO: Once the above works, implement the below:
// document.addEventListener('DOMContentLoaded', () => {
//   const store = configureStore();
//   const root = document.getElementById('root');
//   ReactDOM.render(<Root store={store}/>, root);
// });

// TODO: Testing Purposes only:
// Test that your Root component is properly rendered before moving on.

// TODO: Once the above works, implement the below:

 document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root');
    let store;
    if (window.currentUser) {
      const preloadedState = { session: { currentUser: window.currentUser } };
      store = configureStore(preloadedState);
    } else {
      store = configureStore();
    }
    ReactDOM.render(<Root store={store}/>, root);
}); */}
