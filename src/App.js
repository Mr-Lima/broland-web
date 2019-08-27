import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import theme from 'theme';
import Routes from 'routes';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
}
