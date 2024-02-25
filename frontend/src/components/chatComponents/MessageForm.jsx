// import React, { useRef, useEffect } from 'react';
// import { useFormik } from 'formik';
// import { useSelector } from 'react-redux';
// import { Form, Button } from 'react-bootstrap';
// import { BsArrowRightSquare } from 'react-icons/bs';
// import * as yup from 'yup';
// import useAuth, { useSocketApi } from '../../hooks/index.jsx';
// import { getCurrentChannelId } from '../../slices/selectors.js';
// // import { channelsAdapter } from '../../slices/channelsSlice.js';
// // import { messagesAdapter } from '../../slices/messagesSlice.js';

// // const channelsSelector = channelsAdapter.getSelectors((state) => state.channels);
// // const currentChannel = (state) => (
// //   channelsSelector.selectById(state, state.channels.currentChannelId));
// eslint-disable-next-line max-len, max-len, max-len
// // const channelsNames = (state) => channelsSelector.selectAll(state).map((channel) => channel.name);

// // const messagesSelector = messagesAdapter.getSelectors((state) => state.messages);

// const messageFormSchema = yup.object({
//   body: yup.string().trim().required(),
// });

// const MessagesForm = () => {
//   const { user } = useAuth();
//   console.log(user);
//   // const socketApi = useSocketApi();
//   const { sendMessage } = useSocketApi();
//   const input = useRef(null);
//   // const currentChannelData = useSelector(currentChannel);

//   // const { currentChannelId } = useSelector((state) => state.channels);
//   const currentChannelId = useSelector(getCurrentChannelId);

//   useEffect(() => {
//     input.current.focus();
//   }, []);

//   const formik = useFormik({
//     initialValues: {
//       body: '',
//     },
//     validationSchema: messageFormSchema,
//     onSubmit: (values) => {
//       const { body } = values;
//       const { username } = JSON.parse(localStorage.getItem('userdata'));

//       // eslint-disable-next-line functional/no-conditional-statements
//       if (body) {
//         const newMessage = {
//           body,
//           channelId: currentChannelId,
//           username,
//         };
//         sendMessage(newMessage);
//         formik.resetForm();
//       }
//       input.current.focus();
//     },
//     // initialValues: { text: '', username: user.username },
//     // validationSchema: messageFormSchema,
//     // initialValues: {
//     //   body: '',
//     // },
//     // onSubmit: async ({ text, username }, { resetForm }) => {
//     //   try {
//     //     const message = {
//     //       username,
//     //       text,
//     //       сhannelId: currentChannelId,
//     //     // text: values.body,
//     //     // channelId: activeChannel.id,
//     //     // username: user.username,
//     //     };
//     //     sendMessage(message);
//     //     resetForm();
//     //   } catch (error) {
//     //     console.error(error.message);
//     //     //   try {
//     //     //     await socketApi.sendMessage(message);
//     //     //     formik.values.body = '';
//     //     //   } catch (error) {
//     //     //     console.error(error.message);
//     //     //   }
//     //     // },
//     //     // validateOnChange: messageFormSchema,
//     //   }
//     // },
//   });

//   return (
//     <div className="mt-auto px-5 py-3">
//       <Form
//         noValidate
//         className="py-1 border rounded-2"
//         onSubmit={formik.handleSubmit}
//       >
//         <Form.Group className="input-group">
//           <Form.Label visuallyHidden htmlFor="body">Введите сообщение...</Form.Label>
//           <Form.Control
//             ref={input}
//             onChange={formik.handleChange}
//             value={formik.values.body}
//             onBlur={formik.handleBlur}
//             name="body"
//             placeholder="Введите сообщение..."
//             aria-label="Новое сообщение"
//             required
//             className="border-0 p-0 ps-2"
//             id="body"
//           />
//           <Button
//             variant="group-vertical"
//             disabled={formik.errors.body}
//             style={{ border: 'none' }}
//             type="submit"
//           >
//             <BsArrowRightSquare size="20" />
//             <span className="visually-hidden">Отправить</span>
//           </Button>
//         </Form.Group>
//       </Form>
//     </div>
//   );
// };

// export default MessagesForm;
// // export {
// //   channelsSelector,
// //   currentChannel,
// //   channelsNames,
// //   messagesSelector,
// // };

import React, { useRef } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useChatContext } from '../../contexts/index.jsx';

const MessageForm = () => {
  const { addMessage } = useChatContext();
  const inputRef = useRef(null);

  const validationSchema = Yup.object().shape({
    message: Yup.string().trim().required(),
  });

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: async (value) => {
      try {
        await addMessage(value);
        formik.setSubmitting(false);
        formik.resetForm();
      } catch (error) {
        formik.setSubmitting(false);
        console.error(error.message);
      } finally {
        inputRef.current.focus();
      }
    },
    validationSchema,
  });

  return (
    <div className='mt-auto px-5 py-3'>
      <Form noValidate onSubmit={formik.handleSubmit} className='py-1 border rounded-2'>
        <InputGroup>
          <Form.Control
            type='text'
            name='message'
            placeholder='Введите сообщение...'
            className='border-0 p-0 ps-2'
            onChange={formik.handleChange}
            value={formik.values.message}
            ref={inputRef}
          />
          <Button type='submit' disabled={formik.isSubmitting}>
            <svg
              version='1.1'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 16 16'
              fill='currentColor'
              width={20}
              height={20}
            >
              <path
                fillRule='evenodd'
                d='M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z'
              ></path>{' '}
            </svg>
            <span className='visually-hidden'>Отправить</span>
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default MessageForm;
