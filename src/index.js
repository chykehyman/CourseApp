import React from "react";
import ReactDOM from "react-dom";

import App from './components/App.jsx';
import "../public/main";


ReactDOM.render(<App />, document.getElementById("app"));

if (module.hot) module.hot.accept();
