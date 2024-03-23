import * as yup from 'yup';

// const registrationSchema = (nameMsg, passwordMsg, equalMsg, requiredMsg) => yup.object().shape({
//   username: yup
//     .string()
//     .trim()
//     .min(3, nameMsg)
//     .max(20, nameMsg)
//     .required(requiredMsg),
//   password: yup
//     .string()
//     .trim()
//     .min(6, passwordMsg)
//     .required(requiredMsg),
//   confirmPassword: yup
//     .string()
//     .trim()
//     .oneOf([yup.ref('password'), null], equalMsg)
//     .required(requiredMsg),
// });
const registrationSchema = (t) => yup.object().shape({
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
});

// const loginSchema = (message) => yup.object().shape({
//   username: yup
//     .string()
//     .trim()
//     .required(message),
//   password: yup
//     .string()
//     .required(message),
// });
const loginSchema = (t) => yup.object().shape({
  username: yup
    .string()
    .trim()
    .required(t('errors.required')),
  password: yup
    .string()
    .required(t('errors.required')),
});

// const chatSchema = (message) => yup.object().shape({
//   body: yup
//     .string()
//     .trim()
//     .required(message),
// });
const chatSchema = (t) => yup.object().shape({
  body: yup
    .string()
    .trim()
    .required(t('errors.required')),
});

// const newChannelSchema = (channels, doubleMsg, lengthMsg) => yup.object().shape({
//   name: yup
//     .string()
//     .trim()
//     .required(lengthMsg)
//     .min(3, lengthMsg)
//     .max(20, lengthMsg)
//     .notOneOf(channels, doubleMsg),
// });
const newChannelSchema = (channels, t) => yup.object().shape({
  name: yup
    .string()
    .trim()
    .required(t('errors.required'))
    .min(3, t('modal.lengthParams'))
    .max(20, t('modal.lengthParams'))
    .notOneOf(channels, t('modal.unique')),
});

export {
  registrationSchema,
  loginSchema,
  chatSchema,
  newChannelSchema,
};
