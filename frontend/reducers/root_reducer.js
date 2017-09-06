import { combineReducers } from 'redux';
import samplesReducer from './samples_reducer';

const rootReducer = combineReducers({
  samples: samplesReducer
});

export default rootReducer;
