import React from 'react';

import Logo from '../../images/Logo.svg';
import CardList from '../card-list/card-list';
import Filter from '../filter/filter';

import classes from './App.module.scss';

function App() {
  return (
    <section className={classes.wrapper}>
      <div className={classes['inner-logo']}>
        <img src={Logo} className="logo" />
      </div>
      <div className={classes['main']}>
        <Filter />
        <CardList />
      </div>
    </section>
  );
}
export default App;
