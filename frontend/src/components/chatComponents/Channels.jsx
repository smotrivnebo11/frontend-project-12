/* eslint-disable import/no-extraneous-dependencies */

import React, { useEffect } from 'react';
import {
  Nav, Button, Col,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { animateScroll } from 'react-scroll';

import { actions as channelsActions } from '../../slices/channelsSlice.js';
import { actions as modalActions } from '../../slices/modalSlice.js';
import { CloseChannel, OpenChannel } from './Channel.jsx';

const Channels = ({ channels, currentChannelId }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const defaultChannelId = 1;

  const lastChannelId = channels.at(-1).id;
  useEffect(() => {
    const argument = { containerId: 'channels-box', delay: 0, duration: 0 };
    if (currentChannelId === defaultChannelId) {
      animateScroll.scrollToTop(argument);
    } if (currentChannelId === lastChannelId) {
      animateScroll.scrollToBottom(argument);
    }
  }, [currentChannelId, lastChannelId]);

  const handleSelect = (id) => () => {
    dispatch(channelsActions.switchChannel(id));
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

  return (
    <Col className="col-4 col-md-2 border-end px-0 flex-column h-100 d-flex bg-light">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('pages.channelsTitle')}</b>
        <Button
          className="p-0 text-info"
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
          <span className="visually-hidden">{t('buttons.plus')}</span>
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
                isActive={currentChannelId === id}
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
