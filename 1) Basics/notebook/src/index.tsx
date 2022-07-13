import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './routes/App';
import ReactRouterMUI from './utils/muiReactRouterTheme'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ReactRouterMUI>
      <App />
    </ReactRouterMUI>
  </React.StrictMode>
);
