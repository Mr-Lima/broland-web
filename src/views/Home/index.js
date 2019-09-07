import React, { useEffect } from 'react';

export default function Home({ history }) {
  useEffect(() => {
    history.push('/mine');
  }, [history]);

  return <div />;
}
