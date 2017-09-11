import { connect } from 'react-redux';
import Navigation from './navigation';

const mapStateToProps = function (state) {
  return ({
    currentUser: 'test_user'
  });
};

const mapDispatchToProps = function (dispatch) {
  return {
    logout: () => { console.log('logging out'); },
    login: () => { console.log('logging in');}
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation);
