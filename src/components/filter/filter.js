import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import Checkboxes from '../checkbox/checbox';

import classes from './filter.module.scss';

function Filter() {
  const checked = useSelector((state) => state.filter.checked);
  console.log(checked);
  const filtersData = {
    all: 'Все',
    0: 'Без пересадок',
    1: '1 пересадка',
    2: '2 пересадки',
    3: '3 пересадки',
  };

  const filterListCheckbox = Object.entries(filtersData).map((item) => (
    <Checkboxes value={item[1]} amount={item[0]} checked={checked[item[0]]} key={item[0]} />
  ));

  return (
    <aside className={classes.filterInner}>
      <div className={classes['filter-list']}>
        <h5 className={classes['filter-list__title']}>КОЛИЧЕСТВО ПЕРЕСАДОК</h5>
        <div className={classes['checkbox-inner']}>{filterListCheckbox}</div>
      </div>
    </aside>
  );
}

Filter.defaultProps = { checked: {} };

Filter.propTypes = { checked: PropTypes.shape({}) };

export default memo(Filter);
