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
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={handleRemove}>{t('modal.remove')}</Dropdown.Item>
        <Dropdown.Item onClick={handleRename}>{t('modal.rename')}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export { CloseChannel, OpenChannel };
