// const MessagesHeader = () => (
//   <div className="bg-light mb-4 p-3 shadow-sm small">
//     <p className="m-0">
//       <b># random</b>
//     </p>
//     <span className="text-muted">0 сообщений</span>
//   </div>
// );

// export default MessagesHeader;

import React from 'react';
import { useSelector } from 'react-redux';

import { getAllChannels, getCurrentChannelId, getMessages } from '../../slices/selectors.js';

const MessageHeader = () => {
  const currentChannelId = useSelector(getCurrentChannelId);
  const channels = useSelector(getAllChannels);
  const currentChannel = channels.find((channel) => channel.id === currentChannelId);
  const messages = useSelector(getMessages);

  // CurrentChannel.name
  return (
    <div className='bg-light mb-4 p-3 shadow-sm small'>
      <p className='m-0'>
        <b># {currentChannel}</b>
      </p>
      <span className='text-muted'>{messages.length} сообщений</span>
    </div>
  );
};

export default MessageHeader;
