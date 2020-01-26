const validEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export default validEmail;
