// import { useState } from 'react';
// import AuthContext from './index.jsx';

// const UserDataContextProvider = ({ children }) => {
//   const currentUser = JSON.parse(localStorage.getItem('user'));

//   const [userData, setUserData] = useState(currentUser);

//   const logIn = (data) => {
//     localStorage.setItem('user', JSON.stringify(data));
//     setUserData(data);
//   };

//   const logOut = () => {
//     localStorage.removeItem('user');
//     setUserData(null);
//   };

//   const getUserName = () => userData.username;
//   const getUserToken = () => userData.token;

//   // const singIn - добавить

//   return (
//     <AuthContext.Provider value={{
//       userData, logIn, logOut, getUserName, getUserToken,
//     }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default UserDataContextProvider;

import React, { useState, useMemo } from 'react';

import AuthContext from './index.js';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userdata');
    setLoggedIn(false);
  };

  const memoAuth = useMemo(() => ({ loggedIn, logIn, logOut }), [loggedIn]);

  return <AuthContext.Provider value={memoAuth}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
