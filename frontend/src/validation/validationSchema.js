import * as yup from 'yup';

const registrationSchema = (nameMsg, passwordMsg, equalMsg, requiredMsg) => yup.object().shape({
  username: yup
    .string()
    .trim()
    .min(3, nameMsg)
    .max(20, nameMsg)
    .required(requiredMsg),
  password: yup
    .string()
    .trim()
    .min(6, passwordMsg)
    .required(requiredMsg),
  confirmPassword: yup
    .string()
    .trim()
    .oneOf([yup.ref('password'), null], equalMsg)
    .required(requiredMsg),
});

const loginSchema = (message) => yup.object().shape({
  username: yup
    .string()
    .trim()
    .required(message),
  password: yup
    .string()
    .required(message),
});

const chatSchema = (message) => yup.object().shape({
  body: yup
    .string()
    .trim()
    .required(message),
});

const newChannelSchema = (channels, doubleMsg, lengthMsg) => yup.object().shape({
  name: yup
    .string()
    .trim()
    .required(lengthMsg)
    .min(3, lengthMsg)
    .max(20, lengthMsg)
    .notOneOf(channels, doubleMsg),
  // .required('errors.required')
  // .min(3, 'errors.rangeLetter')
  // .max(20, 'errors.rangeLetter')
  // .notOneOf(channels, 'errors.notOneOf'),
});

export {
  registrationSchema,
  loginSchema,
  chatSchema,
  newChannelSchema,
};
