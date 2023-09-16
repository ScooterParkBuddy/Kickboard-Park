import React from 'react';
import ReactDOM from 'react-dom/client';
import Map from './components/map';
import Bar from './components/navbar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Bar />
    <Map />
  </>,
);
