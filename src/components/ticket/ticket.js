import React from 'react';

import InfoTicket from '../info-ticket/info-ticket';

import classes from './ticket.module.scss';

const Ticket = ({ price, carrier, routeInfo }) => (
  <div className={classes['ticket-inner']}>
    <div className={classes['ticket-header']}>
      <div className={classes['ticket-price']}>{`${price} Р`}</div>
      <div className="logo">
        <img src={`https://pics.avs.io/99/36/${carrier}.png`} alt="logo" />
      </div>
    </div>
    <InfoTicket info={routeInfo[0]} />
    <InfoTicket info={routeInfo[1]} />
  </div>
);

export default Ticket;
