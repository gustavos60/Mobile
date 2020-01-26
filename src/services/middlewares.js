export const responseMiddleware = (response) => Promise.resolve(response.data || response);

export const errorMiddleware = ({ response, message }) => {
  if (response && response.data && response.data.error) {
    return Promise.reject(response.data.error);
  }
  return Promise.reject(message);
};
