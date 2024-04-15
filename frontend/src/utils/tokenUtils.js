const getToken = () => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    // If the token doesn't exist, you can perform other steps to retrieve the token from elsewhere
    // For example: token = getTokenFromReduxStore();
    // Or: token = getTokenFromCookies();
  }

  // Cast token to string or leave it as undefined
  return token;
};

export default getToken;
