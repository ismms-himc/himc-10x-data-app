import { connect } from 'react-redux';
import SampleIndex from './sample_index';
import { selectAllSamples } from '../../../reducers/selectors';
import { requestSamples } from '../../../actions/samples_actions';

function mapStateToProps(state) {
  return {
    samples: selectAllSamples(state),
    loading: state.loading.indexLoading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    requestSamples: () => dispatch(requestSamples())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SampleIndex);
