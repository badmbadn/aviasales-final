import React from 'react';
import { format, addMinutes } from 'date-fns';

import classes from './info-ticket.module.scss';

const InfoTicket = ({ info }) => {
  const { origin, destination, date, duration, stops } = info;
  const transferStops = (data) => {
    if (data.length === 1) {
      return '1 ПЕРEСАДКА';
    }
    if (data.length > 1) {
      return `${data.length} ПЕРЕСАДКИ`;
    }
    return 'БЕЗ ПЕРЕСАДОК';
  };
  const travelTimeDuration = `${Math.floor(duration / 60)}ч ${duration % 60}м`;
  const formatDate = `${format(new Date(date), 'hh:mm')} - ${format(addMinutes(new Date(date), duration), 'hh:mm')}`;
  return (
    <div className={classes['info-ticket']}>
      <div className={classes['info-ticket__direction']}>
        <div className={classes['info-ticket__details']}>{`${origin} - ${destination}`}</div>
        {formatDate}
      </div>
      <div className={classes['info-ticket__duration']}>
        <div className={classes['info-ticket__details']}>В ПУТИ</div>
        {travelTimeDuration}
      </div>
      <div className={classes['info-ticket__transfers']}>
        {' '}
        <div className={classes['info-ticket__details']}>{transferStops(stops)}</div>
        {stops.join(',')}
      </div>
    </div>
  );
};

export default InfoTicket;
