/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import {
  Dropdown, ButtonGroup, Button,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { useFilter } from '../../hooks';

const CloseChannel = ({
  name, handleSelect, isActive,
}) => {
  const filterProfanity = useFilter();
  console.log('isActive', isActive);

  return (
  <Button
    type="button"
    onClick={handleSelect}
    className="w-100 rounded-0 text-start text-truncate"
    variant={isActive ? 'secondary' : null}
  >
    <span className="me-1">#</span>
    {filterProfanity(name)}
  </Button>
  );
};

const OpenChannel = ({
  name, handleSelect, handleRename, handleRemove, isActive,
}) => {
  const { t } = useTranslation();
  const filterProfanity = useFilter();
  console.log('isActive', isActive);
  return (
    <Dropdown
      as={ButtonGroup}
      className="d-flex"
    >
      <Button
        type="button"
        onClick={handleSelect}
        className="w-100 rounded-0 text-start text-truncate"
        variant={isActive ? 'secondary' : null}
      >
        <span className="me-1">#</span>
        {filterProfanity(name)}
      </Button>
      <Dropdown.Toggle
        type="button"
        id="react-aria9230295641-1"
        split
        className="border-0"
        variant={isActive ? 'secondary' : null}
      >
        <span className="visually-hidden">{t('modal.toggle')}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={handleRemove}>{t('modal.remove')}</Dropdown.Item>
        <Dropdown.Item onClick={handleRename}>{t('modal.rename')}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export { CloseChannel, OpenChannel };
