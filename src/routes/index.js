import React, { useCallback, useEffect } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Home from 'views/Home';

import history from './history';
import routes from './routes';
import PrivateRoute from './components/PrivateRoute';

export default function Routes() {
  const getPageCallback = useCallback(path => {
    history.push(path);
  }, []);

  useEffect(() => {
    if (history.location.pathname === '/') {
      history.push('/mine');
    }
  }, [getPageCallback]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <BrowserRouter history={history}>
      <Switch>
        {routes.map(route =>
          route.protected ? (
            <PrivateRoute
              key={route.path}
              path={route.path}
              component={route.component}
            />
          ) : (
            <Route
              key={route.path}
              path={route.path}
              component={route.component}
            />
          ),
        )}
        <Route path="/unauthenticated" render={() => <div>Forbidden</div>} />
        <Route path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}
