const getToken = () => {
  return localStorage.getItem('uToken');
};

const saveToken = (token) => {
  localStorage.setItem('uToken', token);
};

const clearToken = () => {
  localStorage.removeItem('uToken');
};

export { getToken, saveToken, clearToken };
