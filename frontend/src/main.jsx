import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { UserProvider } from './context/UserContext.jsx';
import { BookCacheProvider } from './context/BookCacheContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserProvider>
    <BookCacheProvider>
      <BrowserRouter>
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </BrowserRouter>
    </BookCacheProvider>
  </UserProvider>
);
