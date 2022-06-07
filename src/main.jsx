import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AppProvider } from './context/AppContext';
import { UserProvider } from './context/UserContext';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {main:'#2973c7'},
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <UserProvider>
    <AppProvider>
      <App />
      </AppProvider>
      </UserProvider>
      </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
