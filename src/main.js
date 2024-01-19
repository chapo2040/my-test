import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Code from './CodeMain';
import Main from './CodeMain';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CodeMain></CodeMain>
  </React.StrictMode>
);