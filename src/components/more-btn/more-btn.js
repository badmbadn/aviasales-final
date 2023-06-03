import React from 'react';
import PropTypes from 'prop-types';

import classes from './more-btn.module.scss';

const Button = ({ onClick }) => (
  <div className={classes['show-more']}>
    <button className={classes.button} type="button" onClick={onClick}>
      ПОКАЗАТЬ ЕЩЁ 5 БИЛЕТОВ!
    </button>
  </div>
);

Button.defaultProps = { onClick: () => null, btnClass: '' };
Button.propTypes = { onClick: PropTypes.func, btnClass: PropTypes.string };
export default Button;
