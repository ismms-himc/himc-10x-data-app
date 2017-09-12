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

{/* TODO: use this in else clause: <Redirect to="/login" /> */}
const Protected = ({ component: Component, path, loggedIn }) => (
  <Route path={path} render={(props) => (
     loggedIn ? (
      <Component {...props} />
    ) : (
      <Redirect to="/" />
    )
  )} />
);

{/*const Protected = function ({ component: Component, path, loggedIn }) {
  if (loggedIn) {
    return (<Route path={path} render={<Component {...props} />}/>);
  } else {
    return (<Redirect to="/" path="/"/>);
  }
}*/}



const RedirectedToSamplesIndex = ({ component: Component, path, loggedIn }) => (
  <Route path={path} render={(props) => (
     loggedIn ? (
      <Redirect to="/samples" />
    ) : (
      <Component {...props} />
    )
  )} />
);

{/*TODO: change to this:
    {loggedIn: Boolean(state.session.currentUser)} */}
const mapStateToProps = state => (
  {loggedIn: true}
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
