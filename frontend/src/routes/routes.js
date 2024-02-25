// const apiPath = '/api/v1';

// export default {
//   loginPath: () => [apiPath, 'login'].join('/'),
//   signUpPath: () => [apiPath, 'signup'].join('/'),
//   dataPath: () => [apiPath, 'data'].join('/'),
//   notFoundPagePath: () => '*',
//   chatPagePath: () => '/',
//   loginPagePath: () => '/login',
//   signUpPagePath: () => '/signup',
// };

const root = '';
const apiPath = 'api/v1';

export default {
  chatPagePath: () => [root, ''].join('/'),
  loginPagePath: () => [root, 'login'].join('/'),
  dataPath: () => [root, apiPath, 'data'].join('/'),
  loginPath: () => [root, apiPath, 'login'].join('/'),
  signupPath: () => [root, apiPath, 'signup'].join('/'),
};
