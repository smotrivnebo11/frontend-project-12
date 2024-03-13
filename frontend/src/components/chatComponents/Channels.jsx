/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import {
  Nav, Button, Col,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

// import cn from 'classnames';
import filter from 'leo-profanity';

import { actions as channelsActions } from '../../slices/channelsSlice.js';
import { actions as modalActions } from '../../slices/modalSlice.js';
import { CloseChannel, OpenChannel } from './Channel.jsx';

const Channels = ({ channels, currentChannelId }) => {
  filter.getDictionary();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleSelect = (id) => () => {
    dispatch(channelsActions.changeChannel(id));
  };

  const handleAdd = () => {
    dispatch(modalActions.open({ type: 'adding' }));
  };

  const handleRename = (id, name) => () => {
    const context = {
      channelId: id,
      channelName: name,
    };

    dispatch(modalActions.open({ type: 'renaming', context }));
  };

  const handleRemove = (id, name) => () => {
    const context = {
      channelId: id,
      channelName: name,
    };

    dispatch(modalActions.open({ type: 'removing', context }));
  };

  const sharedClasses = {
    'w-100': true,
    'rounded-0': true,
    'text-start': true,
  };
  const activeClass = (id) => ({
    'btn-secondary': id === currentChannelId,
  });

  return (
    <Col className="col-4 col-md-2 border-end px-0 flex-column h-100 d-flex bg-light">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        {/* <b>{t('ui.channels')}</b> */}
        <b>{t('channelsTitle')}</b>
        <Button
          className="p-0 text-primary"
          variant="group-vertical"
          onClick={handleAdd}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="20"
            height="20"
            fill="currentColor"
            style={{ '--darkreader-inline-fill': 'currentColor' }}
            data-darkreader-inline-fill=""
          >
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <Nav
        variant="pills"
        id="channels-box"
        className="flex-column nav-fill px-2 mb-3 overflow-auto h-100 d-block"
      >
        {channels.map(({ id, name, removable }) => {
          const Channel = removable ? OpenChannel : CloseChannel;

          return (
            <Nav.Item
              key={id}
              className="w-100"
            >
              <Channel
                key={id}
                name={name}
                sharedClasses={sharedClasses}
                activeClass={activeClass(id)}
                handleSelect={handleSelect(id)}
                handleRename={handleRename(id, name)}
                handleRemove={handleRemove(id, name)}
              />
            </Nav.Item>
          );
        })}
      </Nav>
    </Col>
  );
};

export default Channels;

// import { Col, Nav } from 'react-bootstrap';
// import { PlusSquareFill } from 'react-bootstrap-icons';
// import { useDispatch, useSelector } from 'react-redux';
// import { useTranslation } from 'react-i18next';

// import { selectors as channelsSelectors } from '../../slices/channelsSlice.js';
// import { actions as modalsActions } from '../../slices/modalSlice.js';

// import Channel from './Channel.jsx';

// const ChannelsBox = () => {
//   const { t } = useTranslation();
//   const dispatch = useDispatch();
//   const channels = useSelector(channelsSelectors.selectAll);
//   const currentChannelId = useSelector((state) => state.channels.currentChannelId);

//   const handleAddChannel = () => {
//     dispatch(modalsActions.open({ type: 'adding', targetId: null }));
//   };

//   return (
//     <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
//       <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
//         <b>{t('channelsTitle')}</b>
//         <button onClick={handleAddChannel} className="p-0 text-primary btn btn-group-vertical" type="button">
//           <PlusSquareFill size={25} />
//           <span className="visually-hidden">+</span>
//         </button>
//       </div>
//       <Nav variant="pills" className="flex-column nav-fill px-2 mb-3 overflow-auto h-100 d-block">
//         {channels.map((channel) => (
//           <Channel key={channel.id} channel={channel} isActive={currentChannelId === channel.id} />
//         ))}
//       </Nav>
//     </Col>
//   );
// };

// export default ChannelsBox;
