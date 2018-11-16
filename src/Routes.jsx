import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './components/common/Header';
import HomePage from './components/home/HomePage';
import CoursesPage from './components/course/CoursesPage';
import AboutPage from './components/about/AboutPage';
import ManageCoursePage from './components/course/ManageCoursePage';


const Routes = () => (
  <BrowserRouter>
    <Fragment>
      <Header />
      <Switch>
        <Route path="/course/:id" component={ManageCoursePage} />
        <Route path="/course" component={ManageCoursePage} />
        <Route path="/courses" component={CoursesPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/" component={HomePage} />
      </Switch>
    </Fragment>
  </BrowserRouter>
);

export default Routes;
