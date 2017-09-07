import $ from 'jquery';

export const fetchAllSamples = () => {
  return $.ajax({
    method: 'GET',
    url: '/samples'
  });
};
