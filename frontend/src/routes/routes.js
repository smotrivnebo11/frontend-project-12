const apiPath = 'api/v1';

export const appPaths = {
  signupPagePath: () => '/signup',
  loginPagePath: () => '/login',
  chatPagePath: () => '/',
  notFoundPath: () => '*',
};

export const apiRoutes = {
  signupPath: () => [apiPath, 'signup'].join('/'),
  loginPath: () => [apiPath, 'login'].join('/'),
  dataPath: () => [apiPath, 'data'].join('/'),
};
