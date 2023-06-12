import React, { memo } from 'react';
import { Radio } from 'antd';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { sortChange } from '../../store/sortReducer';

import classes from './tabs.module.scss';

function Tabs() {
  const dispatch = useDispatch();
  const updateSort = (params) => dispatch(sortChange(params));
  const btnList = {
    cheapest: 'САМЫЙ ДЕШЁВЫЙ',
    fastest: 'САМЫЙ БЫСТРЫЙ',
    optimal: 'ОПТИМАЛЬНЫЙ',
  };
  const btns = Object.entries(btnList).map((item) => (
    <Radio.Button value={item[0]} className={classes.radioBtnStyle} onClick={() => updateSort(item[0])} key={item[0]}>
      {item[1]}
    </Radio.Button>
  ));
  return (
    <div className={classes['inner-tabs']}>
      <Radio.Group defaultValue="cheapest" buttonStyle="solid" className={classes.radioGroupStyle}>
        {btns}
      </Radio.Group>
    </div>
  );
}

export default memo(Tabs);

Tabs.defaultProps = { updateSort: () => null };

Tabs.propTypes = { updateSort: PropTypes.func };
