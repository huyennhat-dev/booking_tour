const requiresToken = (apiUrl) => {
  const tokenRequiredApiList = ["/products"];

  return tokenRequiredApiList.some((api) => apiUrl.includes(api));
};

export default requiresToken;
