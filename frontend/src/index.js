import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import { UIProvider } from './context/ui.context'; // ✅ Import your UIProvider

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>    
      <UIProvider> {/* ✅ Wrap App with UIProvider */}
        <App />
      </UIProvider>
    </Provider>
  </React.StrictMode>
);
