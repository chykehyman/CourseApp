import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import toastr from 'toastr';

import Routes from './Routes';
import configureStore from './store/store.config';

import '../node_modules/bootstrap/dist/css/bootstrap.min';
import '../public/main';
import '../node_modules/toastr/build/toastr.min.css';
import { loadCourses } from './actions/creators/courseActions';
import { loadAuthors } from './actions/creators/authorActions';

toastr.options = {
  showMethod: 'slideDown',
  hideMethod: 'slideUp',
  closeMethod: 'slideUp',
  progressBar: true,
  closeButton: true,
  hideDuration: 500,
  positionClass: 'toast-top-center',
  timeOut: 3000
};


const store = configureStore();

store.dispatch(loadCourses());
store.dispatch(loadAuthors());

ReactDOM.render(
  <Provider store={store}>
    <div className="container">
      <Routes />
    </div>
  </Provider>,
  document.getElementById('app')
);

if (module.hot) module.hot.accept();
