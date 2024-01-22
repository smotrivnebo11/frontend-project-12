import React, { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { BsArrowRightSquare } from 'react-icons/bs';
import * as yup from 'yup';
import useAuth, { useSocketApi } from '../../hooks/index.jsx';
import { getCurrentChannelId } from '../../slices/selectors.js';
// import { channelsAdapter } from '../../slices/channelsSlice.js';
// import { messagesAdapter } from '../../slices/messagesSlice.js';

// const channelsSelector = channelsAdapter.getSelectors((state) => state.channels);
// const currentChannel = (state) => (
//   channelsSelector.selectById(state, state.channels.currentChannelId));
// eslint-disable-next-line max-len
// const channelsNames = (state) => channelsSelector.selectAll(state).map((channel) => channel.name);

// const messagesSelector = messagesAdapter.getSelectors((state) => state.messages);

const messageFormSchema = yup.object({
  body: yup.string().trim().required(),
});

const MessagesForm = () => {
  const { user } = useAuth();
  // const socketApi = useSocketApi();
  const { sendMessage } = useSocketApi();
  const input = useRef(null);
  // const currentChannelData = useSelector(currentChannel);

  // const { currentChannelId } = useSelector((state) => state.channels);
  const currentChannelId = useSelector(getCurrentChannelId);

  useEffect(() => {
    input.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: { text: '', username: user.username },
    validationSchema: messageFormSchema,
    // initialValues: {
    //   body: '',
    // },
    onSubmit: async ({ text, username }, { resetForm }) => {
      try {
        const message = {
          username,
          text,
          сhannelId: currentChannelId,
        // text: values.body,
        // channelId: activeChannel.id,
        // username: user.username,
        };
        sendMessage(message);
        resetForm();
      } catch (error) {
        console.error(error.message);
        //   try {
        //     await socketApi.sendMessage(message);
        //     formik.values.body = '';
        //   } catch (error) {
        //     console.error(error.message);
        //   }
        // },
        // validateOnChange: messageFormSchema,
      }
    },
  });

  return (
    <div className="mt-auto px-5 py-3">
      <Form
        noValidate
        className="py-1 border rounded-2"
        onSubmit={formik.handleSubmit}
      >
        <Form.Group className="input-group">
          <Form.Label visuallyHidden htmlFor="body">Введите сообщение...</Form.Label>
          <Form.Control
            ref={input}
            onChange={formik.handleChange}
            value={formik.values.body}
            onBlur={formik.handleBlur}
            name="body"
            placeholder="Введите сообщение..."
            aria-label="Новое сообщение"
            required
            className="border-0 p-0 ps-2"
            id="body"
          />
          <Button
            variant="group-vertical"
            disabled={formik.errors.body}
            style={{ border: 'none' }}
            type="submit"
          >
            <BsArrowRightSquare size="20" />
            <span className="visually-hidden">Отправить</span>
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default MessagesForm;
// export {
//   channelsSelector,
//   currentChannel,
//   channelsNames,
//   messagesSelector,
// };
