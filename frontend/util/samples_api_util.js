// TODO: check if jquery works; change url as needed

export const fetchAllSamples = () => {
  return $.ajax({
    method: 'GET',
    url: '/samples'
  });
};
