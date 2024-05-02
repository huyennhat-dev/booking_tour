const getToken = () => {
  return localStorage.getItem('token');
};

const saveToken = (token: string) => {
  localStorage.setItem('token', token);
};

const clearToken = () => {
  localStorage.removeItem('token');
};

export { getToken, saveToken, clearToken };
