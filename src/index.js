import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { ConfirmDialogProvider } from './components/ConfirmationContext.tsx';
import { ToastContextProvider } from './components/ToastContext.tsx';
import { AlertContextProvider } from './components/AlertContext.tsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>       
    
    <ConfirmDialogProvider>  
      <AlertContextProvider>
        <ToastContextProvider>
          <App />      
        </ToastContextProvider>    
      </AlertContextProvider>
    </ConfirmDialogProvider>
    
  </React.StrictMode>
);