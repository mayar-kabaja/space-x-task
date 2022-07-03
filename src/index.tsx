import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './localization/i18n';
import 'antd/dist/antd.css';
import { RootStateProvider } from './RootStateContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <RootStateProvider>
        <App />
      </RootStateProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
