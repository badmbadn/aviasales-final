import { Component } from 'react';

import { _baseURL } from '../utilitary/constants';
export default class Service extends Component {
  async fetchId() {
    try {
      const res = await fetch(`${_baseURL}/search`);
      if (!res.ok) {
        throw new Error(`Could not fetch, received ${res.status}`);
      }
      const data = await res.json();
      return data.searchId;
    } catch (e) {
      if (e.message === 'Failed to fetch') {
        throw Error('Server is unavailable');
      }
      throw Error(e);
    }
  }

  async getTickets(searchId) {
    try {
      const res = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`);
      if (!res.ok) {
        throw new Error('Fetch error');
      }
      return res.json();
    } catch (e) {
      if (e.message === 'Failed to fetch') {
        throw Error('Server is unavailable');
      }
      throw Error(e);
    }
  }
}
