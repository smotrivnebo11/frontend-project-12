import { useCallback, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

import { AuthContext } from './index.js';

import { actions as loadingStateActions } from '../slices/loadingSlice.js';

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  const currentUser = JSON.parse(localStorage.getItem('userId'));
  const [user, setUser] = useState(currentUser);

  const logIn = useCallback((data) => {
    localStorage.setItem('userId', JSON.stringify(data));
    setUser(data);
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem('userId');
    dispatch(loadingStateActions.unload());
    setUser(null);
  }, [dispatch]);

  const getAuthHeader = useCallback(() => {
    if (user && user.token) {
      return { Authorization: `Bearer ${user.token}` };
    }

    return {};
  }, [user]);

  const context = useMemo(() => ({
    user, logIn, logOut, getAuthHeader,
  }), [user, logIn, logOut, getAuthHeader]);

  return (
    <AuthContext.Provider value={context}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
