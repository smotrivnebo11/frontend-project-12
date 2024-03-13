/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import {
  Dropdown, ButtonGroup, Button,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import cn from 'classnames';
import { useFilter } from '../../hooks';

const CloseChannel = ({
  name, sharedClasses, activeClass, handleSelect,
}) => {
  const filterProfanity = useFilter();

  return (
  <Button
    variant="default"
    className={cn(sharedClasses, activeClass)}
    onClick={handleSelect}
  >
    <span className="me-1">#</span>
    {filterProfanity(name)}
  </Button>
  );
};

const OpenChannel = ({
  name, sharedClasses, activeClass, handleSelect, handleRename, handleRemove,
}) => {
  const { t } = useTranslation();
  const filterProfanity = useFilter();

  return (
    <Dropdown
      as={ButtonGroup}
      className="d-flex"
    >
      <Button
        variant="default"
        className={cn(sharedClasses, activeClass, { 'text-truncate': true })}
        onClick={handleSelect}
      >
        <span className="me-1">#</span>
        {filterProfanity(name)}
      </Button>
      <Dropdown.Toggle
        variant="default"
        id="react-aria9230295641-1"
        className={cn(activeClass)}
      >
        <span className="visually-hidden">{t('modal.toggle')}</span>
        {/* {t('buttons.channelManagement')} */}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={handleRemove}>{t('modal.remove')}</Dropdown.Item>
        {/* {t('buttons.remove')} */}
        <Dropdown.Item onClick={handleRename}>{t('modal.rename')}</Dropdown.Item>
        {/* {t('buttons.rename')} */}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export { CloseChannel, OpenChannel };

// import {
//   Button, ButtonGroup, Dropdown, Nav,
// } from 'react-bootstrap';
// import { useDispatch } from 'react-redux';
// import { useTranslation } from 'react-i18next';

// import { useFilter } from '../../hooks/index.js';
// import { actions as channelsActions } from '../../slices/channelsSlice.js';
// import { actions as modalsActions } from '../../slices/modalSlice.js';

// const Channel = ({ isActive, channel }) => {
//   const { t } = useTranslation();
//   const dispatch = useDispatch();
//   const filterProfanity = useFilter();
//   const channelName = filterProfanity(channel.name);

//   const handleRemove = () => {
//     dispatch(modalsActions.open({ type: 'removing', targetId: channel.id }));
//   };

//   const handleRename = () => {
//     dispatch(modalsActions.open({ type: 'renaming', targetId: channel.id }));
//   };

//   const handleChoose = () => {
//     dispatch(channelsActions.switchChannel({ id: channel.id }));
//   };

//   return (
//     <Nav.Item className="w-100">
//       {channel.removable ? (
//         <Dropdown as={ButtonGroup} className="d-flex">
//           <Button onClick={handleChoose} className="w-100 rounded-0 text-start text-truncate" variant={isActive ? 'secondary' : null}>
//             <span>#</span>
//             {' '}
//             {channelName}
//           </Button>

//           <Dropdown.Toggle split variant={isActive ? 'secondary' : null} className="flex-grow-0" id="dropdown-split-basic">
//             <span className="visually-hidden">{t('modal.toggle')}</span>
//           </Dropdown.Toggle>

//           <Dropdown.Menu>
//             <Dropdown.Item onClick={handleRename}>{t('modal.rename')}</Dropdown.Item>
//             <Dropdown.Item onClick={handleRemove}>{t('modal.remove')}</Dropdown.Item>
//           </Dropdown.Menu>
//         </Dropdown>
//       ) : (
//         <Button onClick={handleChoose} className="w-100 rounded-0 text-start" variant={isActive ? 'secondary' : null}>
//           <span>#</span>
//           {' '}
//           {channel.name}
//         </Button>
//       )}
//     </Nav.Item>
//   );
// };

// export default Channel;
