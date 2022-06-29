import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './localization/i18n';
import 'antd/dist/antd.css';
import { RootStateProvider } from './RootStateContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <RootStateProvider>
      <App />
    </RootStateProvider>
  </React.StrictMode>,
);
