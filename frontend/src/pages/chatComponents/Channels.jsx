import React from 'react';
import { useSelector } from 'react-redux';
import { BsPlusSquare } from 'react-icons/bs';
import { Nav, Button } from 'react-bootstrap';
import { getAllChannels, getCurrentChannelId } from '../../slices/selectors.js';

const Channels = () => {
  // const { channels, currentChannelId } = useSelector((state) => state.channels);
  const channels = useSelector(getAllChannels);
  const currentChannelId = useSelector(getCurrentChannelId);
  // console.log('CHANNELS', channels);

  const a = 'some channel';
  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
        <button type="button" className="p-0 text-primary btn btn-group-vertical">
          <BsPlusSquare size="20" />
          <span className="visually-hidden">+</span>
        </button>
      </div>
      <Nav
        as="ul"
        className="flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
        id="channels-box"
      >
        {a}
        <ul className="nav flex-column nav-pills nav-fill px-2">
        {channels.map((el) => (
          <li className="nav-item w-100" key={el.id}>
            <Button
              variant={el.id === currentChannelId ? 'secondary' : 'light'}
              className="w-100 rounded-0 text-start"
            >
              <span className="me-1">#</span>
              {el.name}
            </Button>
          </li>
        ))}
      </ul>
      </Nav>
    </div>
  );
};

export default Channels;
