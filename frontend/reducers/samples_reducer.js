// import { merge, assign, values } from 'lodash';
import {  RECEIVE_SAMPLES } from '../actions/samples_actions';

export default function samplesReducer(state = {}, action) {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SAMPLES:
      return merge({}, action.samples);
      
  default:
    return state;
  }
}
