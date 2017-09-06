export const RECEIVE_SAMPLES = 'RECEIVE_SAMPLES';
export const LOAD_SAMPLES = 'LOAD_SAMPLES ';
// export const RECEIVE_SAMPLE_ERRORS = 'RECEIVE_SAMPLE_ERRORS';

import * as APIUtil from '../util/samples_api_util';

export const loadSamples = () => ({
  type: LOAD_SAMPLES
});

export const receiveSamples = function (samples) {
  return({
    type: RECEIVE_SAMPLES,
    samples
  });
};

// export const receiveSampleErrors = (errors) => ({
//   type: RECEIVE_SAMPLE_ERRORS,
//   errors
// });

export const requestAllSamples = () => (dispatch) => {
	dispatch(loadSamples());
	return APIUtil.fetchAllSamples()
		.then(feedItems => dispatch(receiveSamples(samples)));
};
