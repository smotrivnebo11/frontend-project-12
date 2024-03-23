import * as yup from 'yup';
import { useCallback, useMemo } from 'react';

import { ValidateContext } from './index.js';

const ValidateProvider = ({ children }) => {
  const registrationSchema = useCallback((t) => yup.object().shape({
    username: yup
      .string()
      .trim()
      .min(3, t('regRules.name'))
      .max(20, t('regRules.name'))
      .required(t('errors.required')),
    password: yup
      .string()
      .trim()
      .min(6, t('regRules.password'))
      .required(t('errors.required')),
    confirmPassword: yup
      .string()
      .trim()
      .oneOf([yup.ref('password'), null], t('regRules.passwordEquality'))
      .required(t('errors.required')),
  }), []);

  const loginSchema = useCallback((t) => yup.object().shape({
    username: yup
      .string()
      .trim()
      .required(t('errors.required')),
    password: yup
      .string()
      .required(t('errors.required')),
  }), []);

  const chatSchema = useCallback((t) => yup.object().shape({
    body: yup
      .string()
      .trim()
      .required(t('errors.required')),
  }), []);

  const newChannelSchema = useCallback((channels, t) => yup.object().shape({
    name: yup
      .string()
      .trim()
      .required(t('errors.required'))
      .min(3, t('modal.lengthParams'))
      .max(20, t('modal.lengthParams'))
      .notOneOf(channels, t('modal.unique')),
  }), []);

  const validationSchema = useMemo(() => ({
    registrationSchema, loginSchema, chatSchema, newChannelSchema,
  }), [registrationSchema, loginSchema, chatSchema, newChannelSchema]);

  return (
    <ValidateContext.Provider value={validationSchema}>
      {children}
    </ValidateContext.Provider>
  );
};

export default ValidateProvider;
