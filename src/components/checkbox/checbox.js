import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'antd';
import { useDispatch } from 'react-redux';

import { actionFilter } from '../../store/filterReduser';

import classes from './checkbox.module.scss';

const Checkboxes = ({ value, amount, checked }) => {
  const dispatch = useDispatch();
  const updates = (rates) => dispatch(actionFilter(rates));
  return (
    <div className={classes['checkbox']}>
      <Checkbox id={amount} type="checkbox" checked={checked} onChange={() => updates(amount)}>
        <label htmlFor={amount}>{value}</label>
      </Checkbox>
    </div>
  );
};

Checkboxes.defaultProps = {
  value: 'Все',
  amount: 'all',
  checked: true,
  updates: () => null,
};

Checkboxes.propTypes = {
  value: PropTypes.string,
  amount: PropTypes.string,
  checked: PropTypes.bool,
  updates: PropTypes.func,
};

export default Checkboxes;
