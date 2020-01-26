const notEmpty = (string) => !!(
  string
  && typeof string === 'string'
  && string.length > 0
);

export default notEmpty;
