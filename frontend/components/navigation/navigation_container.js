import { connect } from 'react-redux';
import Navigation from './navigation';
import { logout, login } from '../../actions/session_actions';
import { hashHistory } from 'react-router';

const mapStateToProps = function (state) {
  return ({
    currentUser: state.session.currentUser
  });
};

const mapDispatchToProps = function (dispatch) {
  return {
    logout: () => {
      dispatch(logout()).then(() => hashHistory.push('/login'));
    },
    login: (user) => dispatch(login(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation);
