import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

{/* TODO: implement with along Auth
const Auth = ({ component: Component, path, loggedIn }) => (
  <Route path={path} render={(props) => (
    !loggedIn ? (
      <Component {...props} />
    ) : (
      <Redirect to="/" />
    )
  )} />
);*/}

{/* TODO: use this instead of console.log in else clause: <Redirect to="/login" /> */}
const Protected = ({ component: Component, path, loggedIn }) => (
  <Route path={path} render={(props) => (
     loggedIn ? (
      <Component {...props} />
    ) : (
      console.log('redirecting to /login')
    )
  )} />
);

const RedirectedToSamplesIndex = ({ component: Component, path, loggedIn }) => (
  <Route path={path} render={(props) => (
     loggedIn ? (
      <Redirect to="/samples" />
    ) : (
      null
    )
  )} />
);

{/*TODO: change to this:
    {loggedIn: Boolean(state.session.currentUser)} */}
const mapStateToProps = state => (
  {loggedIn: false}
);

{/* export const AuthRoute = withRouter(connect(mapStateToProps, null)(Auth));*/}

export const ProtectedRoute = withRouter(connect(mapStateToProps, null)(Protected));
export const RedirectLoggedInUserRoute = withRouter(connect(mapStateToProps, null)(RedirectedToSamplesIndex));

{/*
function redirectIfLoggedIn() {
  return <Redirect to="/samples"/>
}

function requireLogIn() {
  console.log('requiring login');
}
*/}
