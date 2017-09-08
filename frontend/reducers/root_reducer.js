import { combineReducers } from 'redux';
import samplesReducer from './samples_reducer';
import loadingReducer from './loading_reducer';

const rootReducer = combineReducers({
  loading: loadingReducer,
  samples: samplesReducer
});

export default rootReducer;
