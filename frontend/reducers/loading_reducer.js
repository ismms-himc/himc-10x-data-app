import {
  LOAD_SAMPLES,
  RECEIVE_SAMPLES
} from '../actions/samples_actions';

const initialState = {
  indexLoading: false,
  singleItemLoading: false
};

export default function loadingReducer(state = initialState, action) {
  Object.freeze(state);
  switch(action.type){
    case RECEIVE_SAMPLES:
      return initialState;
    case LOAD_SAMPLES:
      return Object.assign({}, state, { indexLoading: true });
    default:
      return state;
  }
}
