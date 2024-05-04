const requiresToken = (url: string) => {
  const tokenRequiredPaths: string[] = [
    '/auth/account/create-staff',
    '/auth/account/create',
    '/auth/account',
    '/auth/staff',
    '/auth/user',
    '/auth/upload',
    '/auth/tour',
    '/auth/tour/:id',
    '/auth/book',
    '/auth/book/refund/:id',
  ];

  return tokenRequiredPaths.some((path) => url.startsWith(path));
};

export default requiresToken;
