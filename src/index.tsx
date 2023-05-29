import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './components/app/App';
import store from './store/store'
import { Provider } from 'react-redux'
import * as serviceWorkerRegistration from './serviceWorkerRegistration';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
      <Provider store={store}>
         <App />
      </Provider>
  </React.StrictMode>
);

serviceWorkerRegistration.register();