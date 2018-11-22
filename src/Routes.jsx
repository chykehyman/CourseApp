import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './components/common/Header';
import HomePage from './components/home/HomePage';
import CoursesPage from './components/course/CoursesPage';
import AuthorsPage from './components/author/AuthorsPage';
import AboutPage from './components/about/AboutPage';
import ManageCoursePage from './components/course/ManageCoursePage';
import ManageAuthorPage from './components/author/ManageAuthorPage';
import NoPageFound from './components/common/NotFoundPage';


const Routes = () => (
  <BrowserRouter>
    <Fragment>
      <div className="container-fluid">
        <Header />
      </div>
      <div className="container main-content">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/about" component={AboutPage} />
          <Route exact path="/courses/:id" component={ManageCoursePage} />
          <Route exact path="/courses/add" component={ManageCoursePage} />
          <Route exact path="/courses" component={CoursesPage} />
          <Route exact path="/authors/:id" component={ManageAuthorPage} />
          <Route exact path="/authors/add" component={ManageAuthorPage} />
          <Route exact path="/authors" component={AuthorsPage} />
          <Route component={NoPageFound} />
        </Switch>
      </div>
    </Fragment>
  </BrowserRouter>
);

export default Routes;
