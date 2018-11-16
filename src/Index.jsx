import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Routes from './Routes';
import configureStore from './store/store.config';

import '../node_modules/bootstrap/dist/css/bootstrap.min';
import '../public/main';
import '../node_modules/toastr/build/toastr.min.css';


const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <div className="container">
      <Routes />
    </div>
  </Provider>,
  document.getElementById('app')
);

if (module.hot) module.hot.accept();
