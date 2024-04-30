const requiresToken = (url: string) => {
  const tokenRequiredPaths = ['/upload','/user','/tour'];

  return tokenRequiredPaths.some((path) => url.startsWith(path));
};

export default requiresToken;
