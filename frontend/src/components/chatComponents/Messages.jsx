import React, { useRef, useEffect } from 'react';
import { Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { useFilter } from '../../hooks/index.js';
import Message from './Message.jsx';
import MessageForm from './MessageForm.jsx';

const MessageHeader = ({ channelName, messagesAmount }) => {
  const filterProfanity = useFilter();
  const { t } = useTranslation();

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>{`# ${filterProfanity(channelName)}`}</b>
      </p>
      <span className="text-muted">
        {t('messagesCounter.messages', { count: messagesAmount })}
      </span>
    </div>
  );
};

const MessageBody = ({ channelId, messages }) => {
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current
      ?.lastElementChild
      ?.scrollIntoView({ block: 'start', behavior: 'auto' });
  }, [channelId, messages.length]);

  return (
    <div
      className="chat-messages overflow-auto px-5"
      id="messages-box"
      ref={divRef}
    >
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
};

const Messages = ({ channel, messages }) => (
  <Col className="p-0 h-100">
    <div className="d-flex flex-column h-100">
      <MessageHeader channelName={channel.name} messagesAmount={messages.length} />
      <MessageBody channelId={channel.id} messages={messages} />
      <MessageForm channelId={channel.id} />
    </div>
  </Col>
);

export default Messages;
