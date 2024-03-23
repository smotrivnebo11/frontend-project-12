import { useContext } from 'react';
import {
  AuthContext,
  SocketContext,
  FilterContext,
  ValidateContext,
} from '../contexts/index.js';

export const useAuth = () => useContext(AuthContext);

export const useSocket = () => useContext(SocketContext);

export const useFilter = () => useContext(FilterContext);

export const useValidate = () => useContext(ValidateContext);
