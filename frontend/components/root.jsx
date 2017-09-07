import React from 'react';
import { Provider } from 'react-redux';
import SampleIndexContainer from './samples/index/sample_index_container';
// import { Router, Route, IndexRoute, IndexRedirect, hashHistory } from 'react-router';
// import App from './app';
// import HomeContainer from './home/home_container';
// import LogInFormContainer from './login/login_form_container';
// import SignUpFormContainer from './signup/signup_form_container';

const Root = ({ store }) => (
  <Provider store={store}>
    <div>Hello, world!</div>
  </Provider>
);

export default Root;

// TODO: After testing above, implement this:
{/* const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={ hashHistory }>
      <Route path="/" component={ SampleIndexContainer }/>
    </Router>
  </Provider>
); */}

// TODO: After figuring out auth backend, implement this:
// must create/import App component, HomeContainer, SignUpFormContainer, LogInFormContainer

// const preloadedState = window.currentUser ?
//   { session: { currentUser: window.currentUser, errors: {}}} : {};
//
// delete window.currentUser;
// const store = configureStore(preloadedState);
//
// function isLoggedIn() {
//   return !!store.getState().session.currentUser;
// }
// TODO: where do these args come from?
// function redirectIfLoggedIn(nextState, replace) {
//   if (isLoggedIn()) {
//     replace('/samples');
//   }
// }
//
// function requireLogIn(nextState, replace) {
//   if (!isLoggedIn()) {
//     replace('/login');
//   }
// }
{/*}
const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={ hashHistory }>
      <Route path="/" component={ App }>
        <IndexRoute component={ HomeContainer } onEnter={redirectIfLoggedIn}/>
          <Route
            path='/samples'
            component={ SampleIndexContainer }
            onEnter={ requireLogIn }/>
          <Route
            path='/signup'
            component={ SignUpFormContainer }
            onEnter={ redirectIfLoggedIn }/>
          <Route
            path='/login'
            component={ LogInFormContainer }
            onEnter={redirectIfLoggedIn}/>
      </Route>
    </Router>
  </Provider>
);
*/}
