// TODO: check if jquery works; change url as needed
// how does app know where to find /samples?
export const fetchAllSamples = () => {
  return $.ajax({
    method: 'GET',
    url: '/samples'
  });
};
