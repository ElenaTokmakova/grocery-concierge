import React from 'react';
import ReactDOM from 'react-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import "./assets/styles/scss/mdb-free.scss";
import "./assets/styles/style.scss";
import App from './components/App';

ReactDOM.render(
  <App />, document.getElementById('app')
);

console.log('process.env.VERSION', process.env.VERSION);
console.log('process.env.PLATFORM', process.env.PLATFORM);
console.log('process.env.NODE_ENV', process.env.NODE_ENV);