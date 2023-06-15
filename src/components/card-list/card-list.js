import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Spin } from 'antd';

import Tabs from '../tabs/tabs';
import { getTickets, setSearchId, lookupErrorId } from '../../store/asyncReduser';
import Service from '../../service/service';
import Button from '../more-btn/more-btn';
import ErrorMessage from '../error-message/error-mesage';
import Ticket from '../ticket/ticket';
import { sortTicketsList, applyFilters } from '../../utilitary/sup-functions';

import classes from './card-list.module.scss';
const service = new Service();
const createNewTicket = (item) => (
  <Ticket
    price={item.price}
    carrier={item.carrier}
    routeInfo={item.segments}
    key={`${item.price}${item.carrier}${item.segments[0].stops}`}
  />
);

export default function CardList() {
  const filters = useSelector((state) => state.filter.checked);
  const { tickets, searchId, isLoading, error } = useSelector((state) => state.data);
  const sortItem = useSelector((state) => state.sort.sortItem);
  const dispatch = useDispatch();
  const [ticketsNumber, setTicketsNumber] = useState(5);
  const processedData = useMemo(
    () => sortTicketsList(applyFilters(tickets, filters), sortItem),
    [tickets, filters, sortItem]
  );

  useEffect(() => {
    async function fetchIds() {
      try {
        const id = await service.fetchId();
        dispatch(setSearchId(id));
      } catch (e) {
        dispatch(lookupErrorId(e));
      }
    }
    fetchIds();
  }, []);

  useEffect(() => {
    if (searchId && isLoading) {
      dispatch(getTickets(searchId));
    }
  }, [searchId, isLoading, tickets.length]);

  const ticketList = processedData.length
    ? processedData.slice(0, ticketsNumber).map((item) => createNewTicket(item))
    : [];

  let data = <>{ticketList}</>;
  let btn = <>{<Button className={classes['more-btn']} onClick={() => setTicketsNumber(ticketsNumber + 5)} />}</>;

  const spinner = isLoading && !error && (
    <div className={classes.spinner}>
      <Spin />
    </div>
  );

  const info = 'Рейсов, подходящих под заданные фильтры, не найдено';
  let errorMessage;
  if (error) {
    errorMessage = <ErrorMessage />;
  }

  return (
    <div className={classes['cards']}>
      <Tabs />
      {spinner}
      {!isLoading && !ticketList.length && !error ? info : null}
      <ul className={classes['card-list']}>{error ? errorMessage : data}</ul>
      {!ticketList.length || error ? null : btn}
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
