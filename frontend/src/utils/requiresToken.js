const requiresToken = (url) => {
  const tokenRequiredPaths = ["/auth/book", "/payment/book", "/auth/book/cancel-tour", "/update"];

  return tokenRequiredPaths.some((path) => url.startsWith(path));
};

export default requiresToken;
