/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { client } from './wagmi'
import Aos from 'aos';
import 'normalize.css';
import './style/index.scss';
import ReactDOM from 'react-dom';
import { WagmiConfig } from 'wagmi';
import './asstes/fonts/harmonyos_font/font.css';

import VConsole from 'vconsole';


// const vConsole = new VConsole({ theme: 'dark' });

window.onload = () => {
  Aos.init({
    anchorPlacement: 'center-center',
    mirror: true,
    offset: -500,
  });
}

if (process.env.NODE_ENV === 'production') {
  console.log = () => { };
  console.error = () => { };
  console.warn = () => { };
}


ReactDOM.render(
  <React.StrictMode>
    <WagmiConfig client={client}>
      <App />
    </WagmiConfig>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
