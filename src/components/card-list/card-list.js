import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { Spin } from 'antd';

import Tabs from '../tabs/tabs';
import { getTickets, setSearchId } from '../../store/asyncReduser';
import Service from '../../service/service';
import Button from '../more-btn/more-btn';
import ErrorMessage from '../error-message/error-mesage';
import Ticket from '../ticket/ticket';
import { sortTicketsList, applyFilters } from '../../utilitary/sup-functions';

import classes from './card-list.module.scss';
const service = new Service();
const createNewTicket = (item) => (
  <Ticket price={item.price} carrier={item.carrier} routeInfo={item.segments} key={uuidv4()} />
);

export default function CardList() {
  const filters = useSelector((state) => state.filter.checked);
  const { tickets, searchId, isLoading, error } = useSelector((state) => state.data);
  const sortItem = useSelector((state) => state.sort.sortItem);
  const dispatch = useDispatch();
  const [ticketsNumber, setTicketsNumber] = useState(5);
  const [processedData, setProcessedData] = useState(sortTicketsList(applyFilters(tickets, filters), 'cheapest'));
  useEffect(() => {
    service.fetchId().then((id) => {
      dispatch(setSearchId(id));
    });
  }, []);

  useEffect(() => {
    if (searchId && isLoading) {
      dispatch(getTickets(searchId));
    }
    setProcessedData(sortTicketsList(applyFilters(tickets, filters), sortItem));
  }, [searchId, isLoading, tickets.length, sortItem, filters, error, dispatch]);

  const ticketList = processedData.length
    ? processedData.slice(0, ticketsNumber).map((item) => createNewTicket(item))
    : [];

  let data = ticketList.length ? (
    <>
      {ticketList}
      <Button className={classes['more-btn']} onClick={() => setTicketsNumber(ticketsNumber + 5)} />
    </>
  ) : (
    <div>Рейсов, подходящих под заданные фильтры, не найдено</div>
  );

  const spinner = isLoading && (
    <div className={classes.spinner}>
      <Spin />
    </div>
  );

  let errorMessage;
  if (error) {
    data = null;
    errorMessage = <ErrorMessage />;
  }

  return (
    <div className={classes['cards']}>
      <Tabs />
      {spinner}
      {errorMessage}
      <ul className={classes['card-list']}>{data}</ul>
    </div>
  );
}

CardList.defaultProps = {
  sortItem: 'cheapest',
  searchId: '',
  filters: {},
  tickets: [],
  isLoading: true,
  error: false,
};

CardList.propTypes = {
  sortItem: PropTypes.string,
  filters: PropTypes.shape(),
  tickets: PropTypes.arrayOf(PropTypes.shape()),
  searchId: PropTypes.string,
  isLoading: PropTypes.bool,
  error: PropTypes.bool,
};
