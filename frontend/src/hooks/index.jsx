import { useContext } from 'react';
import AuthContext, { SocketContext } from '../contexts/index.jsx';

const useAuth = () => useContext(AuthContext);
const useSocketApi = () => useContext(SocketContext);

export { useSocketApi };

export default useAuth;
