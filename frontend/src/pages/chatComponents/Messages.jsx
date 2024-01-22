import { Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getAllChannels, getCurrentChannelId, getMessages } from '../../slices/selectors.js';

import MessagesHeader from './MessagesHeader.jsx';

const Messages = () => {
  const messages = useSelector(getMessages);
  const channels = useSelector(getAllChannels);
  const currentChannelId = useSelector(getCurrentChannelId);
  // const { channels, currentChannelId } = useSelector((state) => state.channels);

  const currentChannelName = channels.length !== 0
    ? channels.find((el) => el.id === currentChannelId).name
    : '';

  // const { messages } = useSelector((state) => state.messages);

  const currentMessages = messages.filter((el) => el.channelId === currentChannelId);
  const currentMessagesLength = currentMessages
    ? currentMessages.length
    : 0;

  const a = 'some message';
  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <MessagesHeader />
        {a}
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>{`# ${currentChannelName}`}</b>
          </p>
          <span className="text-muted">
            {{ count: currentMessagesLength }}
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {currentMessagesLength === 0
            ? ''
            : messages.map((el) => (
              <div className="text-break mb-2" key={el.id}>
                <b>{el.username}</b>
                {`: ${el.body}`}
              </div>
            ))}
        </div>
      </div>
    </Col>
  );
};

export default Messages;
