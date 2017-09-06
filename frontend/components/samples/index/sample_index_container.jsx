import { connect } from 'react-redux';
import SampleIndex from './sample_index';
import { selectAllSamples } from '../../../reducers/selectors';
import { requestAllSamples } from '../../../actions/samples_actions';

function mapStateToProps(state) {
  return {
    runs: selectAllRuns(state),
    loading: state.loading.indexLoading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    requestAllSamples: () => dispatch(requestAllSamples())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SampleIndex);
