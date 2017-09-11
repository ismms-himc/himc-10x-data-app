import { connect } from 'react-redux';
import Home from './home';

const mapStateToProps = function (state) {
  return {
    currentUser: 'test_user'
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    login: () => { console.log('logging in');}
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
