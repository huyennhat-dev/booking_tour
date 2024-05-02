const requiresToken = (url) => {
  const tokenRequiredPaths = [

  ];

  return tokenRequiredPaths.some((path) => url.startsWith(path));
};

export default requiresToken;
