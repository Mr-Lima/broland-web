import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import history from 'routes/history';

export default function PrivateRoute(props) {
  const token = localStorage.getItem('token');
  // TODO: pagina de forbidden
  useEffect(() => {
    if (!token) {
      history.push('/unauthenticated');
    }
  }, [token]);

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Route {...props} />;
}
